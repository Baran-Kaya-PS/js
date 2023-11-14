function sum(){
    n = prompt("Combien de nombres voulez-vous additionner ?")
    n = parseInt(n);
    value = (n*(n+1))/2;
    alert("La somme des " + n + " premiers nombres est de " + value);
}

sum();
console.log();