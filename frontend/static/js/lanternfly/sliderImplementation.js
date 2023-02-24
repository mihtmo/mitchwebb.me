
// Constants for the slider stored in HTML elements
const slider = document.querySelector('#map-slider');

// Implement the noUiSlider
noUiSlider.create(slider, {
    behaviour: 'tap-drag',
    connect: true,
    range: {
        min: timestamp(firstDate),
        max: timestamp(lastDate)
    },
    direction: 'ltr',
    // Step by weeks
    step: 7 * 24 * 60 * 60 * 1000,
    start: [timestamp(firstDate), timestamp('May 1, 2016')],
    format: wNumb({ decimals: 0 }),
    pips:{
        mode: 'values',
        values: years.map(year => Date.parse(year)),
        format: {
            to: 
                function(year) {
                    const targetDate = new Date(year);
                    const targetYear = (targetDate.getFullYear() + 1);
                    return targetYear;
                },
            from: 
                function(value) { return value; }
        }
    }
});

// Create a string representation of the date.
function formatDate(date) {
    return `${months[date.getMonth()]}, ${date.getFullYear()}`;
}

const dateValues = [
    document.querySelector('#event-start'),
    document.querySelector('#event-end'),
    document.querySelector('#event-total')
];


// Add slider
const Slider = L.Control.extend({
    options: { position: 'bottomright' },
    onAdd: 
        function (map) {
            const controlSlider = 
                L.DomUtil.create('div', 'map-slider', L.DomUtil.get('map'));
            return controlSlider;
        },
});

map.addControl(new Slider());

// A little bit of responsiveness for small screens
// TODO: Currently only works on load, add live responsiveness
if (window.innerWidth <= 750){
    document.querySelector('.leaflet-control-attribution').style.display = 'none',
    slider.noUiSlider.pips({
        mode: 'values',
        values: years.map(year=>Date.parse(year)),
        density: 2,
        // Change date format
        format: {
            to: 
                function(year) {
                    const targetDate = new Date(year)
                    const targetYear = (targetDate.getFullYear() + 1)
                    if (window.innerWidth < 740) {
                        shortYear = yearsShort[years.indexOf(targetYear)]
                        return shortYear;
                    }
                    else { return targetYear; }
                },
            from: 
                function(value){ return value; }
        }
    })
};

// On update slider, change dates to reflect
slider.noUiSlider.on('update', function(values, handleIndex) {
    dateValues[handleIndex].innerText = formatDate(new Date(+values[handleIndex]));
    const newTimes = slider.noUiSlider.get();
    // Add new range to map data while collecting Sightings Included value
    dateValues[2] = addDataToHexMap(observationData, newTimes[0], newTimes[1]);
    mapText = document.querySelector('#map-text')
    mapText.innerText = "Sightings Included: " + dateValues[2] + " / " + totalSightings
});