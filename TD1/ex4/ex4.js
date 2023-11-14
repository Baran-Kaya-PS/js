/*
1. Créer un tableau tab dont le premier élément est -2, le deuxième 1 et le troisième 4.

2. Créer une fonction additionne prenant un argument x, et renvoyant le résultat de l'addition de x à 2.

3. Créer une fonction affiche, appelée au clic sur un bouton, qui affiche successivement, dans des boîtes de dialogue, le résultat de additionne appliqué au premier élément puis au dernier élément du tableau (en utilisant la propriété length).

 */

var tab = [-2, 1, 4];
function addition(x){
    return x + 2;
}
function affiche(){
    alert(addition(tab[0]));
    alert(addition(tab[tab.length-1]));
}

/*
2. Créer une fonction soustrait prenant un argument x et qui calcule le résultat de la soustraction de x-2. Si le résultat est négatif ou nul, la fonction retourne la chaîne de caractères "Résultat négatif ou nul !" ; sinon, elle retourne "Résultat positif !".

3. Créer une fonction affiche, appelée au clic sur un bouton, qui affiche dans des boîtes d'alerte successivement le résultat de la fonction soustrait appliquée à tous les éléments du tableau tab.
 */
function soustraction(x){
    return x - 2;
}

function affiche2(){
    for (var i = 0; i < tab.length; i++){
        if (soustraction(tab[i]) <= 0){
            alert("Résultat négatif ou nul !");
        } else {
            alert("Résultat positif !");
        }
    }
}
document.getElementById("submit").addEventListener("click", function () {affiche2()});


