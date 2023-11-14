document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form").addEventListener("submit", function(event) { // Écouteur d'événement pour 'submit' et non 'click'
        validate(event); // Passez l'événement en tant que paramètre
    });
});

function validate(event){
    var text = document.getElementById("text");
    var errorSpan = document.getElementById("error"); // Utilisez l'élément span déjà présent dans le HTML

    if (text.value == ""){
        errorSpan.innerHTML = "Le champ ne peut pas être vide";
        event.preventDefault();
    } else {
        errorSpan.innerHTML = text.value;
        event.preventDefault();
    }
}

// pourquoi il n y a pas d'erreur quand c'est vide ?
// peux tu rajouter un span dans le html et le cibler dans le js pour afficher le message écris ?
// peux tu faire en sorte que le formulaire ne s'envoie pas si le champ est vide ? (utilise preventDefault)
