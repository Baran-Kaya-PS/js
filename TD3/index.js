let request = $.ajax({
    type: "GET",
    url: "JO.json"
});

let chart;
let data;

function getValues(data, critere) {
    return [...new Set(data.map(entry => entry[critere]))].sort(); // on récupère toutes les données de data dans un set puis on les map pour les trier
}
function getCountryData(data, pays) {
    return data.filter(entry => entry.Country === pays);
}
function getYears(data) {
    return [...new Set(data.map(entry => entry.Year))].sort();
}
function aggregateYears(data, years) {
    let yearCount = {};
    years.forEach(year => yearCount[year] = 0);
    data.forEach(entry => yearCount[entry.Year]++);
    return yearCount;
}

function treatData(pays, data) {
    let countryData = getCountryData(data, pays);
    let years = getYears(data);
    let medalsPerYear = aggregateYears(countryData, years);
    let sortedYears = Object.keys(medalsPerYear).sort();
    let medalsCount = sortedYears.map(year => medalsPerYear[year]);
    return [sortedYears, medalsCount];
}

function loadChart(years, medals) {
    let ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Medals',
                data: medals,
                borderColor: 'rgb(75, 192, 192)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function getCountries(data) {
    return [...new Set(data.map(entry => entry.Country))].sort();
}

function updateCountry(chart, data, pays) {
    let [years, medals] = treatData(pays, data);
    chart.data.labels = years;
    chart.data.datasets[0].data = medals;
    chart.update();
}

function createCountriesDropDown(chart, data) {
    let countries = getCountries(data);
    let dropDown = document.getElementById('countryDropdown');
    countries.forEach(country => {
        let option = document.createElement('option');
        option.value = country;
        option.text = country;
        dropDown.appendChild(option);
    });
    dropDown.addEventListener('change', function() {
        updateCountry(chart, data, dropDown.value);
    });
}

function totalMedalsByCountry(data) {
    let countries = getCountries(data);
    let medalsCount = countries.map(country => getCountryData(data, country).length);
    return [countries, medalsCount];
}

function medalsBySport(pays, data) {
    let countryData = getCountryData(data, pays);
    let sports = [...new Set(countryData.map(entry => entry.Sport))];
    let medalsCount = sports.map(sport => countryData.filter(entry => entry.Sport === sport).length);
    return [sports, medalsCount];
}

function updateChartType(chart, data, type, pays) {
    let labels, dataset;
    switch (type) {
        case "medalsByYear":
            [labels, dataset] = treatData(pays, data);
            chart.data.labels = labels;
            chart.data.datasets[0].data = dataset;
            chart.data.datasets[0].label = 'Médailles par année';
            break;
        case "totalMedalsByCountry":
            [labels, dataset] = totalMedalsByCountry(data);
            chart.data.labels = labels;
            chart.data.datasets[0].data = dataset;
            chart.data.datasets[0].label = 'Médailles totales';
            break;
        case "medalsBySport":
            [labels, dataset] = medalsBySport(pays, data);
            chart.data.labels = labels;
            chart.data.datasets[0].data = dataset;
            chart.data.datasets[0].label = `Médailles par sport pour ${pays}`;
            break;
    }
    chart.update();
}

request.done(function(responseData) {
    data = responseData;
    let [years, medals] = treatData("France", data);
    chart = loadChart(years, medals);
    createCountriesDropDown(chart, data);

    let chartTypeDropdown = document.getElementById('chartTypeDropdown');
    chartTypeDropdown.addEventListener('change', function() {
        let countryDropdown = document.getElementById('countryDropdown');
        updateChartType(chart, data, chartTypeDropdown.value, countryDropdown.value);
    });
});

request.fail(function(jqXHR, textStatus) {
    alert("Request failed: " + textStatus);
});
