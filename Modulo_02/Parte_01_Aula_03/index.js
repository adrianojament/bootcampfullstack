console.log(process.argv);

const numeros = parseInt(process.argv[2]);
const multiplos = [];

for (let index = 0; index <= numeros; index++) {
  if (index % 3 == 0 || index % 5 == 0) {
    multiplos.push(index);
  }
}
console.log(multiplos);
