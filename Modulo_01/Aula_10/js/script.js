"use strict";

// // var x let
// // var tem escopo abrangente
// // let tem escopo reduzido

// function withVar(){
//     for (var index = 0; index < 10; index++) {
//         console.log('var '+ index);
//     }

//     index = 20;
//     console.log('var '+ index);
// }

// function withLet(){
//     for (let index = 0; index < 10; index++) {
//         console.log('let '+ index);
//     }

//     //index = 20;
//     //console.log('let '+ index);
// }

// withVar();
// withLet();

// // const c = 10;
// // c = 20;

// const d = [];
// console.log(d);
// d.push(1);
// console.log(d);

// function sum(a, b) {
//   return a + b;
// }

// // Função anomima
// const sum2 = function (a, b) {
//   return a + b;
// };

// // arrow function
// const sum3 = (a, b) => {
//   return a + b;
// };

// // arrow function reduzida
// const sum4 = (a,b) => a+b;

// console.log(sum(2, 3));
// console.log(sum2(2, 3));
// console.log(sum3(2, 3));
// console.log(sum4(2, 3));

// // template literals
// const name = 'Adriano';
// const surName = 'Ament';

// // Forma menos legante
// const text1 = 'Meu nome: '+name+' '+surName;

// // Forma mais legante
// const text2 = `Meu nome: ${name} ${surName}`;

// console.log(text1);
// console.log(text2);

// Funcao com parametro de valor padrao

const sum5 = (a,b = 10) => a+b;
console.log(sum5(2,5));