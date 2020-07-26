window.addEventListener("load", () => {
  doFetch();
  doFetchAsync();
  executeDivisionPromise();
  executeDivisionPromiseAsyncAwait();
});

function doFetch() {
  fetch("https://api.github.com/users/rrgomide")
    .then((res) => {
      res
        .json()
        .then((data) => {
          showData(data);
        })
        .catch(() => {
          console.log("Erro ao converter para json");
        });
    })
    .catch(() => {
      console.log("erro");
    });
}

async function doFetchAsync(){
    const res = await fetch("https://api.github.com/users/rrgomide");
    const data = await res.json();    
    console.log(data);
}

function showData(data) {
  const user = document.querySelector("#iduser");

  user.textContent = `${data.login} ${data.name}`;
}

function divisionPromise(a, b) {
  return new Promise(function (resolve, reject) {
    if (b === 0) {
      reject("Não é possivel dividir por 0");
    }

    resolve(a / b);
  });
}

function executeDivisionPromise() {
  divisionPromise(12, 0)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}
