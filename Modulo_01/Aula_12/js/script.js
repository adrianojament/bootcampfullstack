window.addEventListener("load", () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === "Mr"
  );
  const marriedWomem = people.results.filter(
    (person) => person.name.title === "Ms"
  );

  const marriedPeople = [...marriedMen, ...marriedWomem];

  console.log(marriedMen);
  console.log(marriedWomem);
  console.log(marriedPeople);
}

function doRest() {
  console.log(infiniteSum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
}

function infiniteSum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr,0) ;
}

function doDestructuring(){
    const first = people.results[0];

    // Repetitivo
    // const username = first.login.username;
    // const password = first.login.password;

    const { username, password} = first.login;

    console.log(`${username} ${password}`);
}