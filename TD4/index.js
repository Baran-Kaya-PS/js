
let data = $.ajax({
    type:"GET",
    url:"JO.json",
    success:function(response){
        fillCountrySelect(response)
        updateChartForSelectedCountry(response);
    }
});

function updateChartForSelectedCountry(data) {
    var selectedCountry = document.getElementById('countrySelect').value || 'Afghanistan';
    var medalData = getMedalsByType(data,selectedCountry);
    updatePieChart(medalData);
}

function getValues(data,critere){ // City, Year, Sport, Discipline, Event, Athlete, Gender, Country_Code, Country, Event_gender, Medal
    let set= new Set;
    for (let i = 0; i < data.length; i++){
        let value = data[i][critere];
        set.add(value);
    }
    return Array.from(set).sort();
}

function getPays(data){
    return getValues(data,"Country");
}

function getMedalsByType(data,country){
    let gold = [];
    let silver = [];
    let bronze = [];
    for (let i = 0; i < data.length;i++){
        let medal = data[i]["Medal"];
        if (medal === "Gold"){
            gold.push(medal)
        }
        if (medal === "Silver"){
            silver.push(medal)
        } else if (medal === "Bronze"){
            bronze.push(medal)
        }
    }
    return {gold:gold.length,silver:silver.length,bronze:bronze.length};
}

function fillCountrySelect(data){
    var select = document.getElementById('countrySelect');
    var countries = getValues(data,"Country");

    countries.forEach(function(country){
       var option = document.createElement('option');
       option.value = country;
       option.textContent = country;
       select.appendChild(option);
    });

    select.value = 'Afghanistan';
    updateChartForSelectedCountry(data);
}

function updatePieChart(data){
    var ctx = document.getElementById('medalsPieChart').getContext('2d');
    if (window.pieChart) window.pieChart.destroy();

    window.pieChart = new Chart(ctx,{
        type: 'pie',
        data : {
            labels:['Gold','Silver','Bronze'],
            datasets:[{
                labels:'Meldals',
                data:[data.gold,data.silver,data.bronze],
                backgroundColor:['gold','silver','brown']
            }]
        },
    })
}

document.getElementById('countrySelect').addEventListener('change', function() {
    updateChartForSelectedCountry(data);
});