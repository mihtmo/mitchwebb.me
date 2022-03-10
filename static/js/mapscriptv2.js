
    // Define map container and map variable
    var container = L.DomUtil.get('observation_map');
    var map = L.map(container, {
        zoomControl:true,
        maxZoom:14,
        minZoom:3,
        preferCanvas: true
    });

    function timestamp(str) {
        return new Date(str).getTime();
    }

//    var timeDimension = new L.TimeDimension({
//            period: "P1M",
//            timeInterval: "2015-11-01/2021-10-30",
//            currentTime: Date.parse("2015-11-08T00:00:00.000Z")
//        });
//
//    map.timeDimension = timeDimension;
//
//    var player = new L.TimeDimension.Player({
//        transitionTime: 50,
//        loop: false,
//        startOver:true
//    }, timeDimension);
//
//    var timeDimensionControlOptions = {
//        player:        player,
//        timeDimension: timeDimension,
//        position:      'bottomleft',
//        autoPlay:      false,
//        minSpeed:      10,
//        speedStep:     10,
//        maxSpeed:      60,
//        timeSliderDragUpdate: true
//    };
//
//    var timeDimensionControl = new L.Control.TimeDimension(timeDimensionControlOptions);
//        map.addControl(timeDimensionControl);

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
                    <td>' + (feature.properties['time'] !== null ? autolinker.link(feature.properties['time'].toLocaleString()) : '') + '</td>\
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
    }

    // Define observations style
    function style_observations() {
        return {
            pane: 'pane_observations',
            radius: 7.0,
            opacity: 1,
            color: 'black',
            dashArray: '',
//            lineCap: 'butt',
//            lineJoin: 'miter',
            weight: 1,
            fill: true,
            fillOpacity: .6,
            fillColor: 'darkred',
            interactive: true,
        }
    }

    const geo_data = json_observations['features'].flat()

//// OBSERVATIONS LAYER ////
    // Create observations Leaflet pane
    map.createPane('pane_observations');
    map.getPane('pane_observations').style.zIndex = 401;
    map.getPane('pane_observations').style['mix-blend-mode'] = 'normal';

    // Create observations layer and assign to Leaflet pane
    var totalsightings = Object.keys(json_observations).length;

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
            pop_observations
    });

    // Set bounds of map restricted to data points
    bounds_group.addLayer(layer_observations);
    setBounds();

//// HEXGRID LAYER ////
    // Create hexgrid Leaflet pane
    map.createPane('pane_hexgrid');
    map.getPane('pane_hexgrid').style.zIndex = 402;
    map.getPane('pane_hexgrid').style['mix-blend-mode'] = 'normal';

    // Hexgrid center
    var center = [39.4, -78];

    // Define hexgrid options
    var options = {
        radius : 9,
        opacity: 0.8,
        duration: 100,
        pane: 'pane_hexgrid',
        layerName: 'layer_hexgrid'
    };

    var layer_hexgrid = L.hexbinLayer(options);

    layer_hexgrid.colorScale().range(['#f7f6f2', 'darkred']);
    layer_hexgrid
        .radiusRange([9, 9])
        .lng(function(d) { return d[0]; })
        .lat(function(d) { return d[1]; })
        .colorValue(function(d) { return d.length; })
        .radiusValue(function(d) { return d.length; });

    // Add data to map
    var totalsightings

    function addDataToHexMap(obj,start_date,end_date){
        var map_data
        if (start_date !== undefined){
            let filtered_obj = obj.filter(data => timestamp(data.properties['time']) >= start_date && timestamp(data.properties['time']) <= end_date)
            console.log('date provided')
            map_data = filtered_obj
        }
        else{
            console.log('date not provided, so adding all data')
            map_data = obj
        }

        // Get lat/lng for hexgrid data
        var geo_points = map_data.map(feature => ([feature.geometry.coordinates[0],feature.geometry.coordinates[1]]));
        layer_hexgrid.data(geo_points)

        // Calculate total number of sightings from ALL data
        let total_data = obj
        let total_points = total_data.map((feature => ([feature.geometry.coordinates[0],feature.geometry.coordinates[1]])));
        totalsightings = total_points.length

        var total = geo_points.length
        return total
    }

    // Add hexgrid to map
    map.addLayer(layer_hexgrid);

    //initial call for all the data
    addDataToHexMap(geo_data);

    // Add timeDimension control to hexlayer

//    var dumbpoints_geotime = L.timeDimension.layer.geoJson(layer_dumbpoints, {
//        waitForReady: true,
//        period: 'P1M',
//        updateTimeDimension: true,
//        updateTimeDimensionMode: 'extremes',
//    });

    // Legend to allow user to select visible layers
    var overlays = {
        "Time-Based Heatmap": layer_hexgrid,
        "All Sightings": layer_observations,
//        "Points": dumbpoints_geotime
    };

    // Add textbox to map showing number of total data included
    L.Control.textbox = L.Control.extend({
            onAdd: function(map) {

            var maptext = L.DomUtil.create('div');
            maptext.id = 'maptext';
            maptext.innerHTML = 'Sightings Included: '
            return maptext;
            },

            onRemove: function(map) {
                // Nothing to do here
            }
        });
        L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
        L.control.textbox({ position: 'bottomleft' }).addTo(map);

    // Map toggle to switch between hexgrid with time control and ALL points -without- time control
    var timeslider = document.getElementById("map-slider");
    var startholder;
    var endholder;

    map.on('baselayerchange', function(e) {
        if (timeslider.hasAttribute("disabled")) {
            timeslider.removeAttribute("disabled"),
            document.getElementById('event-start').innerHTML = startholder,
            document.getElementById('dash').innerHTML = " - ",
            document.getElementById('event-end').innerHTML = endholder
            maptext.innerHTML = "Sightings Included: "+dateValues[2]
        }
        else {
            timeslider.setAttribute("disabled", "true")
            startholder = document.getElementById('event-start').textContent,
            endholder = document.getElementById('event-end').textContent,
            document.getElementById('event-start').innerHTML = "",
            document.getElementById('dash').innerHTML = "All Sightings",
            document.getElementById('event-end').innerHTML = "",
            maptext.innerHTML = "Sightings Included: "+totalsightings
        }
    });

    L.control.layers(overlays, null).addTo(map);