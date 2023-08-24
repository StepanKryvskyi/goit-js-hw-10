import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_a8jZmEGF80u7QQ6Odgpb1Pv1rUbHrGL1pIrJcjSoKJoshT6SGre8IqfSZyL0LXke';

const API_URL = 'https://api.thecatapi.com/v1/';
const BREEDS_ENDPOINT = 'breeds';
const IMAGES_SEARCH_ENDPOINT = 'images/search';

async function fetchBreeds() {
  try {
    const response = await axios.get(`${API_URL}${BREEDS_ENDPOINT}`);
    return response.data;
  } catch (error) {
    throw new Error('Не вдалося отримати список порід.');
  }
}

async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `${API_URL}${IMAGES_SEARCH_ENDPOINT}?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      'Не вдалося отримати інформацію про кота за обраною породою.'
    );
  }
}

export { fetchBreeds, fetchCatByBreed };
