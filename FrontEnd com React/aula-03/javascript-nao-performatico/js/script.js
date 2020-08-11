const clickArray = [];
window.addEventListener('load', () => {
  const button = document.querySelector('#clickButton');
  button.addEventListener('click', handleButtonClick);
});

function handleButtonClick() {
  clickArray.push(getNewTimestamp());
  render();
}

function render() {
  const ul = document.querySelector('#data');
  let list = '';
  ul.innerHTML = '';
  clickArray.map((item) => {
    list += `<li>${item}</li>`;
  });
  ul.innerHTML = list;

  document.title = clickArray.length;
}

// parei aki
// Aula 3.3 - Desafio
