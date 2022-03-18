
// constants for the slider
var slider = document.getElementById('map-slider');
var default_start_date = first_date
var default_end_date = last_date


// implement the noUiSlider
noUiSlider.create(slider, {
    behaviour: 'tap-drag',
    connect: true,
    range: {
        min: timestamp(default_start_date),
        max: timestamp(default_end_date)
    },
    direction: 'ltr',
    step: 7 * 24 * 60 * 60 * 1000,
    // Handles start at
    start: [timestamp(default_start_date), timestamp('May 1, 2016')],
    format: wNumb({
        decimals: 0
    }),
    pips:{
        mode: 'values',
        values: years.map(year=>Date.parse(year)),
        format: {
            to: function(year) {
                    // custom function to format the months.
    //                var target_month = new Date(month)
    //                if (window.innerWidth > 740){
    //                    month_label = months_short[target_month.getMonth()]
    //                    return month_label
    //                }
                    var target_date = new Date(year)
                    var target_year = (target_date.getFullYear() + 1)
                    if (window.innerWidth < 740) {
//                        console.log(years.indexOf(target_year))
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
      // here we can fill the slider with colors, strings and whatever
//      controlSlider.innerHTML = '<form><input id="command" type="checkbox"/>command</form>';
      return controlSlider;
    },
});

map.addControl(new Slider());

// A little bit of mobile responsiveness
if (window.innerWidth <= 750){
    timeslider.setAttribute("mobile", "true")
    slider.noUiSlider.updateOptions.pips({
        density: 4
    })
};

slider.noUiSlider.on('update', function (values, handle) {
    dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
    var new_times = slider.noUiSlider.get();
    // Add new range to map data while collecting Sightings Included value
    dateValues[2] = addDataToHexMap(geo_data,new_times[0],new_times[1]);
    maptext.innerHTML = "Sightings Included: " + dateValues[2] + " / " + totalsightings
});