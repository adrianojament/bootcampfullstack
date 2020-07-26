"use strict";

window.addEventListener("load", () => {
  doMap();
  doFilter();
  doForeach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});

function doMap() {
  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });
  console.log(nameEmailArray);
  return nameEmailArray;
}

function doFilter() {
  const olderThan50 = people.results.filter((person) => {
    return person.dob.age > 50;
  });

  console.log(olderThan50);
}

function doForeach() {
  const mappedPeople = doMap();

  mappedPeople.forEach((person) => {
    person.NameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });

  console.log(mappedPeople);
}

function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);

  console.log("Reduce: " + totalAges);

  //   let sum = 0;
  //   for (let index = 0; index < people.results.length; index++) {
  //       const person = people.results[index];
  //       sum += person.dob.age;
  //   }
  //   console.log("For: "+sum);
}

function doFind() {
  const found = people.results.find(
    (person) => person.location.state === "Minas Gerais"
  );

  console.log(found);
}

function doSome() {
  const found = people.results.some(
    (person) => person.location.state === "Amazonas"
  );

  console.log(found);
}

function doEvery() {
  const every = people.results.every((person) => person.nat === "BR");

  console.log(every);
}

function doSort() {
  //   const mappedNames = people.results.map((person) => {
  //     return {name: person.name.first};
  //   })
  //   .filter(person => person.name.startsWith('A'))
  //   .sort((a,b) => {
  //     return a.name.localeCompare(b.name);
  //   });

  const mappedNames = people.results
    .map((person) => {
      return { name: person.name.first };
    })
    .filter((person) => person.name.startsWith("A"))
    .sort((a, b) => {
      return a.name.length - b.name.length;
    });

  console.log(mappedNames);
}
