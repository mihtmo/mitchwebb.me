
    var highlightLayer;
    function highlightFeature(e) {
        highlightLayer = e.target;

        if (e.target.feature.geometry.type === 'LineString') {
            highlightLayer.setStyle({
                color: '#ffff00',
            });
        }
        else {
            highlightLayer.setStyle({
                fillColor: '#ffff00',
                fillOpacity: 1
            });
        }
    }

    var container = L.DomUtil.get('observation_map');
    var map = L.map(container, {
        zoomControl:true,
        maxZoom:14,
        minZoom:3
    });
    var hash = new L.Hash(map)

    map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
    var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
    var bounds_group = new L.featureGroup([]);
    function setBounds() {
        if (bounds_group.getLayers().length) {
            map.fitBounds(bounds_group.getBounds());
        }
        map.setMaxBounds(map.getBounds());
    }

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

    layer_Stamen_0;
    map.addLayer(layer_Stamen_0);

    function pop_observationsv2_1(feature, layer) {
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
    }

    function style_observationsv2_1_0() {
        return {
            pane: 'pane_observationsv2_1',
            radius: 8.0,
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

    map.createPane('pane_observationsv2_1');
    map.getPane('pane_observationsv2_1').style.zIndex = 401;
    map.getPane('pane_observationsv2_1').style['mix-blend-mode'] = 'normal';
    var layer_observationsv2_1 = new L.geoJson(json_observationsv2_1, {
        attribution: '',
        interactive: true,
        dataVar: 'json_observationsv2_1',
        layerName: 'layer_observationsv2_1',
        pane: 'pane_observationsv2_1',
        onEachFeature: pop_observationsv2_1,
        pointToLayer: function (feature, latlng) {
            var context = {
                feature: feature,
                variables: {}
            };
            return L.circleMarker(latlng, style_observationsv2_1_0(feature));
        },
    });

    bounds_group.addLayer(layer_observationsv2_1);
    setBounds();
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

    map.createPane('pane_hexobservations');
    map.getPane('pane_hexobservations').style.zIndex = 402;
    map.getPane('pane_hexobservations').style['mix-blend-mode'] = 'normal';
    (function () {
        var max, scale,
            classes = 9,
            scheme = colorbrewer["YlOrRd"][classes];
            container,
            map;

        d3.json(container.dataset.source, function(collection) {
            L.hexLayer(collection, {
                applyStyle: 'hex_style',
            }).addTo(map);
        });

        function hex_style(hexagons) {
            // Maintain a density scale relative to initial zoom level.
            if (!(max && scale)) {
                max = d3.max(hexagons.data(), function (d) { return d.length; });
                scale = d3.scale.quantize()
                          .domain([0, max])
                          .range(d3.range(classes));
            }

            hexagons
                .attr('stroke', scheme[classes - 1])
                .attr('fill', function (d) {
                    return scheme[scale(d.length)];
                });
        };
    });

    map.on('zoomend', function() {
        if (map.getZoom() < 12){
                map.removeLayer(layer_observationsv2_1);
        }
        else {
                map.addLayer(layer_observationsv2_1);
            }
    });
