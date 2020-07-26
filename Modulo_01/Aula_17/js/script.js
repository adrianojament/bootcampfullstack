/**
 *Estado da apliação (state)
 */

let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoritesCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');

  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  // prettier-ignore
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const urlCountries = 'https://restcountries.eu/rest/v2/all';
  const res = await fetch(urlCountries);
  const json = await res.json();
  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      flag,
    };
  });
  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  renderList(allCountries, tabCountries, '', '+');
}

function renderFavorites() {
  renderList(favoritesCountries, tabFavorites, 'red darken-4', '-');
}

function renderList(list, tab, color, tituloBotao) {
  let countries = '<div>';

  list.forEach((country) => {
    const { id, name, population, flag } = country;
    const countryHTML = `
      <div class='country'>
         <div>           
            <a id="${id}" class="waves-effect waves-light btn ${color}">${tituloBotao}</a>
         </div>
         <div>            
            <img src="${flag}" alt="${name}">
         </div>
         <div>            
            <ul>
               <li>${name}</li>
               <li>${formatNumber(population)}</li>
            </ul>
         </div>
      </div>
    `;
    countries += countryHTML;
  });
  countries += '</div>';
  tab.innerHTML = countries;
}
function renderSummary() {
  countCountries.textContent = formatNumber(allCountries.length);
  countFavorites.textContent = formatNumber(favoritesCountries.length);

  totalPopulationList.textContent = Summary(allCountries);
  totalPopulationFavorites.textContent = Summary(favoritesCountries);
}

function Summary(list) {
  const total = list.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);
  return formatNumber(total);
}

function handleCountryButtons() {
  if (allCountries.length > 0) {
    const countriesButtons = Array.from(tabCountries.querySelectorAll('.btn'));
    countriesButtons.forEach((button) => {
      button.addEventListener('click', () => addToFavorites(button.id));
    });
  }

  if (favoritesCountries.length > 0) {
    const favoritesButtons = Array.from(tabFavorites.querySelectorAll('.btn'));
    favoritesButtons.forEach((button) => {
      button.addEventListener('click', () => removeFromFavorites(button.id));
    });
  }
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find((country) => country.id === id);

  favoritesCountries = [...favoritesCountries, countryToAdd];
  favoritesCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  allCountries = allCountries.filter((country) => country.id !== id);

  render();
}

function removeFromFavorites(id) {
  const removeFrom = favoritesCountries.find((country) => country.id === id);

  allCountries = [...allCountries, removeFrom];
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  favoritesCountries = favoritesCountries.filter(
    (country) => country.id !== id
  );

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
