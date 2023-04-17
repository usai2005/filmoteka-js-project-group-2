import refs from './refs.js';
import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import api from './api-client.js';

export default function onTrailerClick() {
  refs.moviesGallery.addEventListener('click', watchTrailer);
}

// Click event listener //

export let key = '';

async function watchTrailer(e) {
  e.preventDefault();
  key = '';
  if (
    e.target.closest('.card__link')?.querySelector('movie-item__image') ===
    undefined
  ) {
    return;
  }
  await api
    .getMoviesTrailer(e.target.closest('.card__link').id)
    // fetchTrailer(e.target.closest('.card__link').id)
    .then(data => {
      console.log(data);
      // renderTrailer(data);
      key = data;
    })
    .catch(error => {
      console.log(error);
    });
}

// Выбрать фильм по ID // Ключ API (v3 auth) 9218a8fe57d9a10810e7b861ea45534f //
// function fetchTrailer(filmID, lang) {
//   return axios
//     .get(
//       `https://api.themoviedb.org/3/movie/${filmID}/videos?api_key=9218a8fe57d9a10810e7b861ea45534f&language=${lang}`
//     )
//     .then(response => response.data)
//     .then(data => {
//       console.log(data.results); /////
//       return data.results;
//     });
// }

// Визуализировать модальный трейлер //

// function renderTrailer(data) {
//   data.forEach(obj => {
//     console.log(obj);
//     if (obj.name.includes('Official')) {
//       key = obj.key;
//     }
//   });

//   return key;
// }
