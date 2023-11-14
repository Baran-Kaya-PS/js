
$(document).ready(function() {
    alert($("#myDiv").html());
    $("div[name='subDiv2'] h5").text("** Section 2 modifiée **");
    var myDivContent = $("#myDiv").html();
    var firstLink = $("a").first().prop("outerHTML"); //prop("outerHTML") permet de récupérer le texte jusqu'a même la balise
    var occurenceOfAContent = $("a").length; // .length permet de compter le nombre d'occurence
    var occurenceOfAWithContent = $("a:contains('content')").length;
    alert(myDivContent + "\n\n" + firstLink + " Il y a " + occurenceOfAContent + " balises a dans le document"+ "\n\n" + " Il y a " + occurenceOfAWithContent + " balises a contenant le mot Content dans le document");

    $("#saisie").keypress(function (e){ // on créer un objet qui contient les informations de l'évènement (soit ce qu'on met dans le placeholder)
        if(e.which == 13){// si la touche pressée est la touche entrée (13 qui est la touche entrée)
            alert("Vous avez saisi : " + $(this).val()); // ça affiche une alerte avec le texte saisi
        }
    })


});


// Modifier le script de l'exercice 5 afin de modifier, lorsque le DOM est prêt, le texte de la balise <h5> située dans la balise div ayant pour name la valeur 'subDiv2'. La nouvelle valeur de la balise h5 sera '** Section 2 modifiée **'.

