import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_a8jZmEGF80u7QQ6Odgpb1Pv1rUbHrGL1pIrJcjSoKJoshT6SGre8IqfSZyL0LXke';
const API_URL = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_URL = `https://api.thecatapi.com/v1/images/search`;

function fetchBreeds() {
    return axios.get(API_URL);
  }

  function createBreedSelectMarkup(arr) {
    return arr
      .map(({ id, name }) => `<option value = "${id}" > ${name} </option>`)
      .join('');
  }
  
  function fetchCatByBreed(breedId) {
    return axios.get(`${SEARCH_URL}?breed_ids=${breedId}`);
  }
  
  function createCatMarkup(arr) {
    console.log(arr);
  
    return arr
      .map(
        ({
          url,
          breeds: {
            0: { name, temperament, description },
          },
        }) => `<img src="${url}" alt="${name}" width="800" height="500" />
    <div>
    <h1 class="title">${name}</h1>
    <p class="description">${description}</p>
    <h2>Temperament:</h2>
    <p class="description">${temperament}</p></div>`
      )
      .join('');
  }
  
  export {
    fetchBreeds,
    fetchCatByBreed,
    createBreedSelectMarkup,
    createCatMarkup,
  };