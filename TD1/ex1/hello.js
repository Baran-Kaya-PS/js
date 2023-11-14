document.getElementById("submit").addEventListener("click", function () {surfaceRectangle()});
function surfaceRectangle(longueur, largeur) {
    // récupérer les valeurs du index.html puis les convertir en nombre
    longueur = prompt("Quelle est la longueur du rectangle ?");
    largeur = prompt("Quelle est la largeur du rectangle ?")
    var surface = longueur * largeur;
    alert("La surface du rectangle est de " + surface);
}

//Créer une fonction qui demande la saisie d'un rayon puis retourne la surface du cercle de ce rayon.
function value(){
    var rayon = Number(document.getElementById("rayon").value);
    var surface = Math.PI * rayon * rayon;
    document.getElementById("surface").innerHTML = surface;
}

surfaceRectangle();