
// constants for the slider
var slider = document.getElementById('map-slider');
console.log(timestamp(first_date))
console.log(timestamp(last_date))
// implement the noUiSlider
noUiSlider.create(slider, {
    behaviour: 'tap-drag',
    connect: true,
    range: {
        min: timestamp(first_date),
        max: timestamp(last_date)
    },
    direction: 'ltr',
    step: 7 * 24 * 60 * 60 * 1000,
    // Handles start at
    start: [timestamp(first_date), timestamp('May 1, 2016')],
    format: wNumb({
        decimals: 0
    }),
    pips:{
        mode: 'values',
        values: years.map(year=>Date.parse(year)),
        format: {
            to: function(year) {
                var target_date = new Date(year)
                var target_year = (target_date.getFullYear() + 1)
                if (window.innerWidth < 740) {
                    shortyears = years_short[years.indexOf(target_year)]
                    return shortyears
                }
                else {
                    return target_year
                }
            },
            from: function(value){
                    return value
            }
        }
    }
});

// Create a string representation of the date.
function formatDate(date) {
    return months[date.getMonth()] + ", " +
           date.getFullYear();
}

var dateValues = [
    document.getElementById('event-start'),
    document.getElementById('event-end'),
    document.getElementById('event-total')
];


// add slider
var Slider = L.Control.extend({
    options: {
      position: 'bottomright',
    },
    onAdd: function (map) {
      var controlSlider = L.DomUtil.create('div', 'map-slider', L.DomUtil.get('map'));
      return controlSlider;
    },
});

map.addControl(new Slider());

// A little bit of mobile responsiveness
if (window.innerWidth <= 750){
    document.getElementsByClassName('leaflet-control-attribution')[0].style.display = 'none',
    slider.noUiSlider.pips({
        mode: 'values',
        values: years.map(year=>Date.parse(year)),
        density: 2,
        format: {
            to: function(year) {
                var target_date = new Date(year)
                var target_year = (target_date.getFullYear() + 1)
                if (window.innerWidth < 740) {
                    shortyears = years_short[years.indexOf(target_year)]
                    return shortyears
                }
                else {
                    return target_year
                }
            },
            from: function(value){
                    return value
            }
        }
    })
};

slider.noUiSlider.on('update', function (values, handle) {
    dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
    var new_times = slider.noUiSlider.get();
    // Add new range to map data while collecting Sightings Included value
    dateValues[2] = addDataToHexMap(geo_data,new_times[0],new_times[1]);
    maptext.innerHTML = "Sightings Included: " + dateValues[2] + " / " + totalsightings
});