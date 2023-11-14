/*Exercice : écriture d’une fonction renvoyant une valeur

1. Créer une fonction qui demande la saisie d'un rayon puis retourne la surface du cercle de ce rayon.

Note : regarder la documentation de l’objet Javascript Math pour l’utilisation du Pi.

2. Afficher, à laide d’une boîte de dialogue, le résultat de l'appel à cette fonction en cliquant sur un bouton d’un formulaire HTML.
*/

function surfaceCercle() {
    var rayon = prompt("Quelle est le rayon du cercle ?");
    surface = Math.PI * rayon * rayon;
    alert("La surface du cercle est de " + surface);
}

document.getElementById("submit").addEventListener("click", function () {
    var rayon = Number(document.getElementById("rayon").value);
    alert("La surface du cercle est de " + surfaceCercle(rayon));
});

console.log();

surfaceCercle();