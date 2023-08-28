import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreed, BREEDS_ENDPOINT } from './cat-api';

const elements = {
  breedSelect: document.getElementById('breed-select'),
  catInfo: document.getElementById('catInfo'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

if (BREEDS_ENDPOINT !== 'breeds') {
  elements.breedSelect.classList.add('hidden');
}

elements.breedSelect.addEventListener('change', onBreedSelectChange);

const notiflixOptions = {
  position: 'center-center',
  timeout: 3000,
  width: '400px',
  fontSize: '24px',
};

function onBreedSelectChange(e) {
  const breedId = e.target.value;

  // Викликайте функцію fetchCatByBreed з ключовим словом "then" для обробки результату
  fetchCatByBreed(breedId)
    .then(catData => {
      if (!catData.length || !catData[0].url) {
        elements.catInfo.innerHTML = '';
        displayError('Дані для цієї породи відсутні');
        return;
      }
      elements.catInfo.innerHTML = createCatInfo(catData);
      Notiflix.Notify.success('Search was successful', '');
      elements.catInfo.style.display = 'block';
    })
    .catch(error => {
      displayError(error.message);
    });
}

function createBreedSelectOptions(breeds) {
  return breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createCatInfo(catData) {
  return catData
    .map(
      ({ url, breeds: [{ name, temperament, description }] }) => `
      <img src="${url}" alt="${name}" width="800" height="500" />
      <div>
        <h1 class="title">${name}</h1>
        <p class="description">${description}</p>
        <h2>Temperament:</h2>
        <p class="description">${temperament}</p>
      </div>
    `
    )
    .join('');
}

function displayError(message) {
  elements.catInfo.innerHTML = '';
  Notiflix.Notify.failure(message, notiflixOptions);
}

function showLoader() {
  elements.loader.classList.add('loader');
}

function hideLoader() {
  elements.loader.classList.remove('loader');
}

function initSlimSelect() {
  new SlimSelect({
    select: elements.breedSelect,
  });
}

function initApp() {
  showLoader();
  
  fetchBreeds()
    .then(breeds => {
      elements.breedSelect.innerHTML = createBreedSelectOptions(breeds);
      initSlimSelect();
    })
    .catch(error => {
      displayError(error.message);
    })
    .finally(() => {
      hideLoader();
    });
}

initApp();