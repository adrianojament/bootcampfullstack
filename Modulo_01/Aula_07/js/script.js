// Aula 7.1

var title = document.querySelector('h1');
title.textContent = "Adriano Ament";

var city = document.querySelector('#city');
city.textContent = "São Paulo - SP";

var personalDataArray = document.querySelectorAll('.data')
personalDataArray = Array.from(personalDataArray);

for (var index = 0; index < personalDataArray.length; index++) {
  var element = personalDataArray[index];
  element.classList.add('emphasis');
}

// Aula 7.2