//import des fonctions du fichier index.js

let request = $.ajax({
    type: "GET",
    url: "JO.json",
    dataType:"json"
})

let chart;
let data;

function getValues(data, critere) {
    return [...new Set(data.map(entry => entry[critere]))].sort();
} // retourne les valeurs uniques d'un critère

function getSports(data){
    return [...new Set(data.map(entry => entry.sport))];
}


function getCountryData(data, pays) {
    return data.filter(entry => entry.Country === pays); // on récupère un dataset avec les données du pays
} // retourne les données d'un pays

function getYears(data) {
    return [...new Set(data.map(entry => entry.Year))].sort();
} // retourne les années

function aggregateYears(data, years) { // retourne le nombre de médailles par année
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
} // retourne les données traitées pour le graphique

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
} // charge le graphique

function getCountries(data) {
    return [...new Set(data.map(entry => entry.Country))].sort();
} // retourne les pays

function updateCountry(chart, data, pays) {
    let [years, medals] = treatData(pays, data);
    chart.data.labels = years;
    chart.data.datasets[0].data = medals;
    chart.update();
} // met à jour le graphique en fonction du pays
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
} // crée la liste déroulante des pays

function totalMedalsByCountry(data) {
    let countries = getCountries(data);
    let medalsCount = countries.map(country => getCountryData(data, country).length);
    return [countries, medalsCount];
} // retourne le nombre total de médailles par pays

function totalMedalsBySport(data){
    let sports = getSports(data);
    let medalsCount = sports.map(sport => {
        return data.filter(entry => entry.sport === sport).length;
    });
    return [sports, medalsCount];
}


function medalsBySport(pays, data) {
    let countryData = getCountryData(data, pays);
    let sports = getSports(countryData);
    let medalsCount = sports.map(sport => countryData.filter(entry => entry.sport === sport).length);
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
} // met à jour le graphique en fonction du type de graphique
/*
Créez un graphique à barres empilées qui montre le nombre de médailles d'or,
d'argent et de bronze gagnées par les 5 premiers pays du classement.
Chaque pays aura une barre,
et cette barre sera divisée en trois segments représentant le nombre de médailles de chaque type.
 */
// faire la fonction pour les 5 premiers pays du classement
function getTopFive(data) {
    let countries = getCountries(data); // ensemble des countries
    let medalsCount = countries.map(country => getCountryData(data, country).length);
    let topFive = [];
    for (let i = 0; i < 5; i++) {
        let max = Math.max(...medalsCount); // on récupère le max de medalsCount
        let index = medalsCount.indexOf(max); // on récupère l'index du max
        topFive.push(countries[index]); // on ajoute le pays correspondant à l'index du max
        // Supprimer l'entrée pour éviter de la sélectionner à nouveau
        medalsCount.splice(index, 1); // on supprime le max de medalsCount ce qui permet de trouver le prochain max et empêche d'avoir le meme pays plusieurs fois
        countries.splice(index, 1);  // pareil pour countries
    }
    return topFive; // on retourne les 5 premiers pays du classement
}

// ... (reste du code inchangé)

function getMedalsByType(data, pays) {
    let countryData = getCountryData(data, pays);
    let gold = countryData.filter(entry => entry.Medal === "Gold").length;
    let silver = countryData.filter(entry => entry.Medal === "Silver").length;
    let bronze = countryData.filter(entry => entry.Medal === "Bronze").length;
    return { gold, silver, bronze };
}

function MedalBySport(data, pays) {
    let countryData = getCountryData(data, pays); // on récupère toutes les données du pays
    let sports = getSports(countryData);
    let CountryMedals = getMedalsByType(data,pays);

}


function GraphiqueBarresEmpilees(data) {
    let topFive = getTopFive(data);
    let medalsData = topFive.map(pays => getMedalsByType(data, pays));

    let goldData = medalsData.map(data => data.gold);
    let silverData = medalsData.map(data => data.silver);
    let bronzeData = medalsData.map(data => data.bronze);

    let ctx = document.getElementById('top5Chart').getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topFive,
            datasets: [
                {
                    label: 'Gold',
                    data: goldData,
                    backgroundColor: 'gold'
                },
                {
                    label: 'Silver',
                    data: silverData,
                    backgroundColor: 'silver'
                },
                {
                    label: 'Bronze',
                    data: bronzeData,
                    backgroundColor: '#cd7f32' // bronze color
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            }
        }
    });
}


// ... (reste du code inchangé)

function Graphique_des_medailles_par_annee(data) {
    let [years, medals] = treatData("France", data);
    let ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Médailles par année',
                data: medals,
                backgroundColor: 'blue'
            }]
        },
        options: {
            responsive: true
        }
    });
}


function graphique_des_medailles_par_pays(data,pays) {
    // ajouter les pays dans le selecteur id="selecteur_Pays"
    let [country, MedalsByCountry] = totalMedalsByCountry(data);
    let [sports, medalBySport] = medalsBySport(pays, data);
    let ctx = document.getElementById('countrySportChart').getContext('2d');
    return new Chart (ctx, {
        type: 'bar',
        data: {
            labels: country, // le pays
            datasets: [{
                label: 'Médailles par sport',
                data: medalsBySport, // le nombre de médailles par sport
                backgroundColor: 'blue'
            }]
        }
    })
}


function fillCountrySelector(data) {
    let countries = getCountries(data); // ensemble des countries
    let selector = document.getElementById('selecteur_Pays'); // on récupère le selecteur
    countries.forEach(country => { // pour chaque pays
        let option = document.createElement('option'); // on crée une option dans le selecteur
        option.value = country; // on lui donne la valeur du pays
        option.text = country; // on lui donne le texte du pays
        selector.appendChild(option); // on ajoute l'option au selecteur
    });
}

request.done(function(data) { // fonction main si la requête est réussie

    console.log("Request done");
    GraphiqueBarresEmpilees(data);
    Graphique_des_medailles_par_annee(data);
    console.log("GraphiqueBarresEmpilees done");
    fillCountrySelector(data)
    console.log("Graphique_des_medailles_par_annee done");
    document.getElementById('selecteur_Pays').addEventListener('change', function() {
        let selectedCountry = this.value;
        graphique_des_medailles_par_pays(data, selectedCountry);});
});


request.fail(function(jqXHR, textStatus, errorThrown) {
    console.error("Erreur lors de la requête:", textStatus, errorThrown);
});
