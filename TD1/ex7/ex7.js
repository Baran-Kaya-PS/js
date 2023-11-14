/*
Créer une page web comportant une phrase dont un groupe de mots, de couleur noire au chargement, doit prendre la couleur :

rouge (red) au passage de la souris ;
jaune (yellow) en réponse à un click ;
vert citron (lime) en réponse à un double click.
Il faudra utiliser this.style.color.
 */

var phrase = document.getElementById("phrase");
phrase.addEventListener("mouseover", function () {this.style.color = "red"});
phrase.addEventListener("click", function () {this.style.color = "yellow"});
phrase.addEventListener("dblclick", function () {this.style.color = "lime"});