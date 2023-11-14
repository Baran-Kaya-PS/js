/*
Ecrire un script qui va générer un nombre aléatoire entre 1 et 1024, et demander à l'utilisateur de retrouver ce nombre. A chaque essai, le script indiquera si le nombre à trouver est plus grand ou plus petit. Lorsque le nombre est trouvé, le script affichera le nombre de coups qui ont été nécessaires à l'utilisateur.

Vous devez utiliser un formulaire comprenant un champ de type text et un bouton de validation du formulaire, ainsi qu'un paragraphe (élément HTML p) afin de donner les indications à l'utilisateur.

Notes :

Regarder la documentation de la méthode random de l'objet Math ;
Utiliser la fonction is_numeric ci-dessous pour savoir si une chaine de caractères n'est composée que de chiffres ;
Utiliser l'évènement onSubmit du formulaire pour déclencher le traitement JS.
function is_numeric(chaine) {
var exp=new RegExp("^[0-9]*$","g");
return exp.test(chaine);
}
*/

function is_numeric(chaine) {
    var exp=new RegExp("^[0-9]*$","g");
    return exp.test(chaine);
}
function generateRandom(){
    return Math.random() * (1024 - 1) + 1;
}
function guessNumber(){
    var random = Math.floor(generateRandom());
    var saisie = prompt("Saisissez un nombre entre 1 et 1024");
    var coups = 1;
    while(!is_numeric(saisie) || saisie < 1 || saisie > 1024){
        saisie = prompt("Saisissez un nombre entre 1 et 1024");
    }
    while(saisie != random){
        if(saisie < random){
            saisie = prompt("C'est plus grand !");
        } else {
            saisie = prompt("C'est plus petit !");
        }
        while(!is_numeric(saisie) || saisie < 1 || saisie > 1024){
            saisie = prompt("Saisissez un nombre entre 1 et 1024");
        }
        coups++;
    }
    alert("Bravo ! Vous avez trouvé le nombre en "+coups+" coups !");
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submit").addEventListener("click", guessNumber);
});
