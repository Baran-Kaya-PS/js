$(document).ready(function() {
    console.log("Script started");

    let globalData = []; // Variable globale pour stocker les données

    // Votre fonction AJAX pour récupérer les données initiales
    $.ajax({
        dataType: "json",
        url: "generated.json",
        success: function(data) {
            globalData = data; // Stockez les données dans la variable globale
            updateList(data); // Mettez à jour la liste avec les données initiales
            updateChart(data); // Mettez à jour le graphique avec les données initiales
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Erreur lors de la récupération du JSON:", textStatus, errorThrown);
        }
    });

    function updateList(data) {
        var tableContent = '<table border="1">';
        tableContent += '<thead><tr><th>Name</th><th>Address</th><th>Email</th><th>Phone</th></tr></thead><tbody>';
        data.forEach(function(user) {
            tableContent += '<tr><td>' + user.name + '</td><td>' + user.address + '</td><td>' + user.email + '</td><td>' + user.phone + '</td></tr>';
        });
        tableContent += '</tbody></table>';
        $("#Users").html(tableContent);
    }

    function updateChart(data) {
        // Créer un objet pour stocker le compte
        let counts = {};

        // Parcourir chaque utilisateur et extraire le troisième caractère
        data.forEach(function(user) {
            let thirdChar = user.phone.charAt(4);
            if (!counts[thirdChar]) {
                counts[thirdChar] = 0;
            }
            counts[thirdChar]++;
        });

        // Préparer les données pour le graphique
        let labels = Object.keys(counts);
        let chartData = Object.values(counts);

        // Créer le graphique
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Nombre de personnes',
                    data: chartData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre de personnes'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Troisième caractère du numéro de téléphone'
                        }
                    }
                }
            }
        });
    }

    // ajouter un user
    $("#addUserButton").click(function() {
        let newUser = {
            name: $("#name").val(),
            phone: $("#phone").val(),
            address: $("#address").val(),
            email: $("#email").val()
        };

        globalData.push(newUser); // Ajoutez le nouvel utilisateur à la variable globale

        updateChart(globalData); // Mettez à jour le graphique
        updateList(globalData); // Mettez à jour la liste

        $("#userForm")[0].reset();
    });
});
