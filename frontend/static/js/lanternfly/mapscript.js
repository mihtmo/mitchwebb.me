// Helper function for getting timestamp
function timestamp(str) {
    return new Date(str).getTime();
}

// Define map container and map variable with default params
const container = L.DomUtil.get('observation-map');
const map = L.map(container, {
    zoomControl:true,
    maxZoom:14,
    minZoom:3, 
    preferCanvas: true
});

// Give some credit! (This is attached to leaflet map class)
map.attributionControl.setPrefix(
    `<a href="https://github.com/tomchadwin/qgis2web" target="_blank">
        qgis2web
    </a> 
        &middot; 
    <a href="https://leafletjs.com" title="A JS library for interactive maps">
        Leaflet
    </a> 
        &middot; 
    <a href="https://qgis.org">
        QGIS
    </a>`
);

// Create saturation filter for visuals. Too BRIGHT.
const satFilter = ['saturate:80%', 'opacity:85%'];

// Create map tiles layer using Stamen terrain (and apply filter)
map.createPane('pane-stamen');
map.getPane('pane-stamen').style.zIndex = 1;
const layerStamen = L.tileLayer.colorFilter(
    'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.jpg', 
    {
        pane: 'pane-stamen',
        opacity: 1,
        attribution: '',
        minZoom: 3,
        maxZoom: 14,
        minNativeZoom: 3,
        maxNativeZoom: 14,
        filter: satFilter
    }
);
// Add tiles layer to map
map.addLayer(layerStamen);

// Define observation point style
function styleObservations() {
    return {
        pane: 'pane-observations',
        radius: 7.0,
        opacity: 1,
        color: 'black',
        dashArray: '',
        weight: 1,
        fill: true,
        fillOpacity: .6,
        fillColor: 'darkred',
        interactive: true,
    };
}

// Set highlight behavior of markers when hovered
let highlightLayer;

function highlightFeature(e) {
    highlightLayer = e.target;
    highlightLayer.setStyle({
        fillColor: '#ffffff',
        fillOpacity: 1
    });
}

// Establish observation point and attach popup content/highlight functionality
function popObservations(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (i in e.target._eventParents) {
                e.target._eventParents[i].resetStyle(e.target);
            }
        },
        mouseover: highlightFeature,
    });

    const dateTime = new Date(feature.properties['observationTime'].slice(0, -4));
    const dateOnly = dateTime.toLocaleDateString('en-US');
    const inatUrl = (feature.properties['url']);

    // Popup for individual iNaturalist sightings
    const popupContent =
        `<table>
            <tr>
                <th scope="row"> Date Observed </th>
                <td> ${dateOnly} </td>
            </tr>
            <tr>
                <th scope="row"> Place Observed </th>
                <td> 
                    ${feature.properties['place'] ? 
                        feature.properties['place'].toLocaleString() 
                        : 
                        'No Location'
                    } 
                </td>
            </tr>
            <tr>
                <th scope="row"> iNat Sighting </th>
                <td> <a href=${inatUrl}> iNaturalist Sighting </a> </td>
            </tr>
        </table>`
    ;
    layer.bindPopup(popupContent, {maxHeight: 400});
}

// Sort for first and last data points for slider range
const observationTimes = [];

// TODO: Fix formatting of dates on backend.
for (let observation in lanternflyData['features']) {
    observationTimes.push(lanternflyData['features'][observation]["properties"]["observationTime"].slice(0, -4));
}

const sortedTimes = observationTimes.sort(function(a,b){
    return (a - b);
});

let totalSightings = sortedTimes.length;
const firstDate = sortedTimes[0];
const lastDate = sortedTimes[totalSightings - 1];


//// OBSERVATIONS LAYER ////
// Create observations Leaflet pane
map.createPane('pane-observations');
map.getPane('pane-observations').style.zIndex = 2;
map.getPane('pane-observations').style['mix-blend-mode'] = 'normal';

// Create observations layer and assign to Leaflet pane
const layerObservations = new L.geoJson(lanternflyData, {
    attribution: '',
    interactive: true,
    dataVar: 'lanternflyData',
    layerName: 'layer-observations',
    pane: 'pane-observations',
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, styleObservations(feature));
    },
    onEachFeature: popObservations
});


// Create leaflet featureGroup for setting map bounds
const boundsGroup = new L.featureGroup([]);
let defaultboundaries;

function setBounds() {
    if (boundsGroup.getLayers().length) {
        map.fitBounds(boundsGroup.getBounds());
    }
    defaultboundaries = map.getBounds();
    map.setMaxBounds([
        [
            (defaultboundaries["_northEast"]["lat"] + 10), 
            (defaultboundaries["_northEast"]["lng"] + 5)
        ],
        [
            (defaultboundaries["_southWest"]["lat"] - 10), 
            (defaultboundaries["_southWest"]["lng"] - 5)
        ]
    ]);
}
boundsGroup.addLayer(layerObservations);
setBounds();


//// HEXGRID LAYER ////
// Create hexgrid Leaflet pane
map.createPane('pane-hexgrid');
map.getPane('pane-hexgrid').style.zIndex = 3;
map.getPane('pane-hexgrid').style['mix-blend-mode'] = 'normal';

// Hexgrid center
const center = [39.4, -78];

// Define hexgrid options
const options = {
    radius : 11,
    opacity: 1,
    duration: 100,
    pane: 'pane-hexgrid',
    layerName: 'layer-hexgrid'
};
const layerHexgrid = L.hexbinLayer(options);

// Set colorScale for hexgrid
layerHexgrid.colorScale().range(['#f7f6f2', 'darkred']);
layerHexgrid
    .lng(function(d) { return d[0]; })
    .lat(function(d) { return d[1]; })
    .colorValue(function(d) { return d.length; });

// Function for adding data to Hex Map
function addDataToHexMap(obj, firstDate, lastDate){
    let mapData;
    // TODO: Why would start date ever be defined in this case?
    if (firstDate !== undefined){
        const filteredObj = obj['features'].filter(data => 
            timestamp(data.properties['observationTime'].slice(0, -4)) >= firstDate 
            && 
            timestamp(data.properties['observationTime'].slice(0, -4)) <= lastDate
        );
        mapData = filteredObj;
    console.log('date provided')
    } else {
        console.log('date not provided, so adding all data')
        mapData = obj['features'];
    }

    // Get lat/lng for hexgrid data
    const geoPoints = mapData.map(feature => 
        ([feature.geometry.coordinates[0],feature.geometry.coordinates[1]])
    );
    layerHexgrid.data(geoPoints);

    // Calculate total number of sightings from ALL data
    // const totalPoints = mapData.map(feature => 
    //     ([feature.geometry.coordinates[0],feature.geometry.coordinates[1]])
    // );
    totalSightings = observationTimes.length;

    const pointsIncluded = geoPoints.length;
    return pointsIncluded;
}

// Add data to hexgrid
addDataToHexMap(lanternflyData);

// Add hexgrid to map
map.addLayer(layerHexgrid);

// Legend to allow user to select visible layers
const overlays = {
    "Time-Based Heatmap": layerHexgrid,
    "All Sightings": layerObservations,
};
L.control.layers(overlays, null).addTo(map);

// Add textbox to map showing number of total data included
L.Control.textbox = L.Control.extend({
        onAdd: function(map) {
        const mapText = L.DomUtil.create('div');
        mapText.id = 'map-text';
        mapText.innerHTML = 'Sightings Included: ';
        return mapText;
        }
    });
    L.control.textbox = function(opts) { 
        return new L.Control.textbox(opts);
    }
    L.control.textbox({ position: 'bottomleft' }).addTo(map);

// Map toggle to switch between hexgrid with time control and ALL points without time control
let startHolder;
let endHolder;

map.on('baselayerchange', function() {
    if (slider.hasAttribute("disabled")) {
        slider.removeAttribute("disabled");
        document.querySelector('#event-start').innerText = startHolder;
        document.querySelector('#dash').innerText = " - ";
        document.querySelector('#event-end').innerText = endHolder;
        mapText.innerText = 
            `Sightings Included: ${dateValues[2]} / ${totalSightings}`;
    } else {
        slider.setAttribute("disabled", "true")
        // Hold on to last slider values
        startHolder = document.querySelector('#event-start').textContent;
        endHolder = document.querySelector('#event-end').textContent;
        document.querySelector('#event-start').innerText = null;
        document.querySelector('#dash').innerText = "All Sightings";
        document.querySelector('#event-end').innerText = null;
        mapText.innerText =    
            `Sightings Included: ${totalSightings} / ${totalSightings}`;
    }
});