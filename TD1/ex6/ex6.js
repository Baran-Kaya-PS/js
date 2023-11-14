/*
Exercice : utilisation de while

Au clic sur un bouton, lancer la fonction testWhile. Cette fonction demande à l'utilisateur de saisir une chaîne de caractères contenant le caractère " (guillemets), et réitère cette demande tant que l'utilisateur n'a pas à nouveau saisi le caractère ". La fonction affiche alors la chaîne saisie entre guillemets au sein d’une boîte de dialogue.
 */

function testWhile(){
    var saisie = prompt("Saisissez une chaîne de caractères contenant le caractère \"");
    while(saisie.indexOf("\"") == -1){
        saisie = prompt("Saisissez une chaîne de caractères contenant le caractère \"");
    }
    alert("\""+saisie);
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submit").addEventListener("click", testWhile);
});
