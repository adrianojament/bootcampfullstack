var a = 5;
var b = 4;

if (a > b) {
  console.log(a + " é maior que " + b);
} else {
  if (a < b) {
    console.log(a + " é menor que " + b);
  } else {
    console.log(a + " é igual a " + b);
  }
}

var dia = 7;
var resposta = "";

// prettier-ignore
switch (dia) {
  case 1:resposta = "Domingo";break;
  case 2:resposta = "Segunda";break;
  case 3:resposta = "Terça";break;
  case 4:resposta = "Quarta";break;
  case 5:resposta = "Quinta";break;
  case 6:resposta = "Sexta";break;
  case 7:resposta = "Sabado";break;
  default:      
    resposta = "Dia invalido";
}

console.log(resposta);

// Somatorio com while
var numeroAtual = 1;
var somatorio = 0;

while (numeroAtual <= 10) {
  somatorio += numeroAtual;
  numeroAtual++;
}
console.log("While: " + somatorio);

// Somatorio com do ... while
numeroAtual = 1;
somatorio = 0;

do {
  somatorio += numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);
console.log("Do While: " + somatorio);

numeroAtual = 1;
somatorio = 0;
//Somatorio com o For....
for (numeroAtual = 0; numeroAtual <= 10; numeroAtual++) {
  somatorio += numeroAtual;
}
console.log("For: " + somatorio);
