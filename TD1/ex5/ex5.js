/*
Exercice : utilisation de switch
Au clic sur un bouton, lancer la fonction jourDeLaSemaine(). Cette fonction détermine le numéro du jour de la semaine et affiche le jour correspondant.

Note : regarder la documentation de l’objet Javascript Date pour retrouver le numéro du jour de la semaine.
 */

function jourDeLaSemaine() {
    var date = new Date();
    var numeroJour = date.getDay();
    var jourCorrespondant;
    switch (numeroJour) {
        case 0:
            jourCorrespondant = "Dimanche";
            break;
        case 1:
            jourCorrespondant = "Lundi";
            break;
        case 2:
            jourCorrespondant = "Mardi";
            break;
        case 3:
            jourCorrespondant = "Mercredi";
            break;
        case 4:
            jourCorrespondant = "Jeudi";
            break;
        case 5:
            jourCorrespondant = "Vendredi";
            break;
        case 6:
            jourCorrespondant = "Samedi";
            break;
        default:
            jourCorrespondant = "Jour inconnu";
    }
    alert("Aujourd'hui, nous sommes " + jourCorrespondant + ".");
}
document.getElementById('submit').addEventListener('click', jourDeLaSemaine);