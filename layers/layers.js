var wms_layers = [];


        var lyr_Stamen_0 = new ol.layer.Tile({
            'title': 'Stamen',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
            })
        });
var format_cb_2018_us_state_500k_1 = new ol.format.GeoJSON();
var features_cb_2018_us_state_500k_1 = format_cb_2018_us_state_500k_1.readFeatures(json_cb_2018_us_state_500k_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_cb_2018_us_state_500k_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_cb_2018_us_state_500k_1.addFeatures(features_cb_2018_us_state_500k_1);
var lyr_cb_2018_us_state_500k_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_cb_2018_us_state_500k_1, 
                style: style_cb_2018_us_state_500k_1,
                interactive: false,
                title: '<img src="styles/legend/cb_2018_us_state_500k_1.png" /> cb_2018_us_state_500k'
            });
var format_observations_2 = new ol.format.GeoJSON();
var features_observations_2 = format_observations_2.readFeatures(json_observations_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_observations_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_observations_2.addFeatures(features_observations_2);
var lyr_observations_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_observations_2, 
                style: style_observations_2,
                interactive: true,
                title: 'observations'
            });

lyr_Stamen_0.setVisible(true);lyr_cb_2018_us_state_500k_1.setVisible(true);lyr_observations_2.setVisible(true);
var layersList = [lyr_Stamen_0,lyr_cb_2018_us_state_500k_1,lyr_observations_2];
lyr_cb_2018_us_state_500k_1.set('fieldAliases', {'STATEFP': 'STATEFP', 'STATENS': 'STATENS', 'AFFGEOID': 'AFFGEOID', 'GEOID': 'GEOID', 'STUSPS': 'STUSPS', 'NAME': 'NAME', 'LSAD': 'LSAD', 'ALAND': 'ALAND', 'AWATER': 'AWATER', });
lyr_observations_2.set('fieldAliases', {'id': 'id', 'observed_on': 'observed_on', 'latitude': 'latitude', 'longitude': 'longitude', 'place': 'place', 'inaturl': 'inaturl', 'photos': 'photos', });
lyr_cb_2018_us_state_500k_1.set('fieldImages', {'STATEFP': 'TextEdit', 'STATENS': 'TextEdit', 'AFFGEOID': 'TextEdit', 'GEOID': 'TextEdit', 'STUSPS': 'TextEdit', 'NAME': 'TextEdit', 'LSAD': 'TextEdit', 'ALAND': 'TextEdit', 'AWATER': 'TextEdit', });
lyr_observations_2.set('fieldImages', {'id': 'Range', 'observed_on': 'DateTime', 'latitude': 'TextEdit', 'longitude': 'TextEdit', 'place': 'TextEdit', 'inaturl': 'TextEdit', 'photos': 'TextEdit', });
lyr_cb_2018_us_state_500k_1.set('fieldLabels', {'STATEFP': 'no label', 'STATENS': 'no label', 'AFFGEOID': 'no label', 'GEOID': 'no label', 'STUSPS': 'no label', 'NAME': 'no label', 'LSAD': 'no label', 'ALAND': 'no label', 'AWATER': 'no label', });
lyr_observations_2.set('fieldLabels', {'id': 'inline label', 'observed_on': 'inline label', 'latitude': 'no label', 'longitude': 'no label', 'place': 'header label', 'inaturl': 'inline label', 'photos': 'inline label', });
lyr_observations_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});