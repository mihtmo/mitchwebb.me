
    // Define map container and map variable
    var container = L.DomUtil.get('observation_map');
    var map = L.map(container, {
        zoomControl:true,
        maxZoom:14,
        minZoom:3,
    });

    // Give some credit!
    map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');

    // Create featuregroup for setting map bounds
    var bounds_group = new L.featureGroup([]);
    function setBounds() {
        if (bounds_group.getLayers().length) {
            map.fitBounds(bounds_group.getBounds());
        }
        map.setMaxBounds(map.getBounds());
    }

    // Create empty latlngs array for hexbin functionality
    latlngs = [];

    // Create map tiles layer using Stamen terrain
    map.createPane('pane_Stamen_0');
    map.getPane('pane_Stamen_0').style.zIndex = 400;
    var layer_Stamen_0 = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
        pane: 'pane_Stamen_0',
        opacity: 1.0,
        attribution: '',
        minZoom: 3,
        maxZoom: 14,
        minNativeZoom: 3,
        maxNativeZoom: 14
    });

    // Add tiles layer to map
    layer_Stamen_0;
    map.addLayer(layer_Stamen_0);

    // Setup autolinker for popup menu items
    var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

    // Set highlight properties of markers
    var highlightLayer;
    function highlightFeature(e) {
        highlightLayer = e.target;

        if (e.target.feature.geometry.type === 'LineString') {
            highlightLayer.setStyle({
                color: '#ffffff',
            });
        }
        else {
            highlightLayer.setStyle({
                fillColor: '#ffffff',
                fillOpacity: 1
            });
        }
    }

    // Establish observation point and attach popup content/highlight functionality
    // Will be referenced later from observations layer
    function pop_observations(feature, layer) {
        layer.on({
            mouseout: function(e) {
                for (i in e.target._eventParents) {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            },
            mouseover: highlightFeature,
        });
        var popupContent =
            '<table>\
                <tr>\
                    <th scope="row">Date Observed</th>\
                    <td>' + (feature.properties['observed_on'] !== null ? autolinker.link(feature.properties['observed_on'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                    <th scope="row">Place Observed</th>\
                    <td>' + (feature.properties['place'] !== null ? autolinker.link(feature.properties['place'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                    <th scope="row">iNaturalist Link</th>\
                    <td>' + (feature.properties['inaturl'] !== null ? autolinker.link(feature.properties['inaturl'].toLocaleString()) : '') + '</td>\
                </tr>\
                <tr>\
                    <th scope="row">Photo</th>\
                    <td>' + (feature.properties['photos'] !== null ? autolinker.link(feature.properties['photos'].toLocaleString()) : '') + '</td>\
                </tr>\
            </table>';
        layer.bindPopup(popupContent, {maxHeight: 400});

        // Push latlng coordinates of points to array to be used in hexbins
        latlngs.push(feature.geometry.coordinates);
    }

    // Define observations style
    function style_observations() {
        return {
            pane: 'pane_observations',
            radius: 7.0,
            opacity: 1,
            color: 'rgba(35,35,35,0.617)',
            dashArray: '',
            lineCap: 'butt',
            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: 1,
            fillColor: 'rgba(222,0,0,0.617)',
            interactive: true,
        }
    }

    // Create observations Leaflet pane
    map.createPane('pane_observations');
    map.getPane('pane_observations').style.zIndex = 401;
    map.getPane('pane_observations').style['mix-blend-mode'] = 'normal';

    // Create observations layer and assign to Leaflet pane
    var layer_observations = new L.geoJson(json_observations, {
        attribution: '',
        interactive: true,
        dataVar: 'json_observations',
        layerName: 'layer_observations',
        pane: 'pane_observations',
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            return L.circleMarker(latlng, style_observations(feature));
        },
        // Connect to popup features
        onEachFeature:
            pop_observations,
    });

    // Set bounds of map restricted to data points
    bounds_group.addLayer(layer_observations);
    setBounds();

    // TODO: Get rid of this?
    /* Used to define layers, editable from the user-side. No necessarily important.
    var mapDiv = document.getElementById('observation_map');
    var row = document.createElement('div');
    row.className="row";
    row.id="all";
    row.style.height = "100%";
    var col1 = document.createElement('div');
    col1.className="col9";
    col1.id = "mapWindow";
    col1.style.height = "99%";
    col1.style.width = "99%";
    col1.style.display = "inline-block";
    */

    // Create hexgrid Leaflet pane
    map.createPane('pane_hexgrid');
    map.getPane('pane_hexgrid').style.zIndex = 402;
    map.getPane('pane_hexgrid').style['mix-blend-mode'] = 'normal';

    // TODO: Possibly delete, doesn't seem to connect
    var center = [39.4, -78];

    // Define hexgrid options
    var options = {
        radius : 16,
        opacity: 0.8,
        duration: 500,
        pane: 'pane_hexgrid',
        layerName: 'layer_hexgrid'
    };

    var layer_hexgrid = L.hexbinLayer(options)

    layer_hexgrid.colorScale().range(['lightgrey', 'red']);
    layer_hexgrid
        .radiusRange([13, 16])
        .lng(function(d) { return d[0]; })
        .lat(function(d) { return d[1]; })
        .colorValue(function(d) { return d.length; })
        .radiusValue(function(d) { return d.length; });

    // Connect map datasource
    layer_hexgrid.data(latlngs);

    // Add hexgrid to map
    map.addLayer(layer_hexgrid);

    // Change map views at a certain zoom level (hide individual observations until zoomed in)
    map.on('zoomend', function() {
        if (map.getZoom() <= 10){
            if (map.hasLayer(layer_observations)){
                map.removeLayer(layer_observations),
                map.addLayer(layer_hexgrid);
            }
            else{
                map.addLayer(layer_hexgrid);
            }
        }
        else {
            if (map.hasLayer(layer_hexgrid)){
                map.removeLayer(layer_hexgrid),
                map.addLayer(layer_observations);
            }
            else{
                map.addLayer(layer_observations);
            }
        }
    });
