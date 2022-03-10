
// constants for the slider
var slider = document.getElementById('map-slider');
var default_start_date = 'Oct 1,2015'
var default_end_date = 'Dec 1,2022'

// TODO: need to change the months to use the start and end dates...
yearVals = years.map(year=>Date.parse("January 1,"+year))

// implement the noUiSlider
noUiSlider.create(slider, {
    // step: ,
    behaviour: 'tap-drag',
    connect: true,
    range: {
        min: timestamp(default_start_date),
        max: timestamp(default_end_date)
    },
    direction: 'ltr',
    step: 7 * 24 * 60 * 60 * 1000,
    start: [timestamp(default_start_date), timestamp('May 1, 2016')],
    format: wNumb({
    decimals: 0
    }),
    pips:{
        mode: 'values',
        values: yearVals,
        format: {
            to: function(year){
                // custom function to format the months.
//                var target_month = new Date(month)
//                if (window.innerWidth > 740){
//                    month_label = months_short[target_month.getMonth()]
//                    return month_label
//                }
                var target_year = new Date(year)
                console.log(target_year)
                return target_year.getFullYear()
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


slider.noUiSlider.on('update', function (values, handle) {
    dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
    var new_times = slider.noUiSlider.get();
    // addDataToHexMap(geo_features,new_times[0],new_times[1])
    dateValues[2] = addDataToHexMap(geo_data,new_times[0],new_times[1]);
    maptext.innerHTML = "Sightings Included: "+dateValues[2]
});