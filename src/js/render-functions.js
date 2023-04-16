import apiClient from './api-client.js';
import { pagination } from './pagination.js';
import refs from './refs.js';
import {showSpinnerIfPageLoads} from './loader.js';

export async function showPopularMovies() {

  const movies = await apiClient.getPopularMovie();

  pagination.reset(apiClient.totalMovies);

  appendMovies(movies);

  
}

export function appendMovies(movies) {
  
  refs.loader.classList.remove('preloader__loader--page-loaded');

  showSpinnerIfPageLoads();
  
  setTimeout(() => {
  
  refs.moviesGallery.innerHTML = '';

  if (movies.length === 0) return;

  const markup = movies
    .map(({ title, imgUrl, genres, year, id }) => {
      const shortTitle =
        title.length <= 30 ? title : `${title.slice(0, 30)} ...`;
      return `
          <li class="movie-item list" data-id="${id}">
          <a class="card__link" id = "${id}" href="#">
          <img src="${imgUrl}" alt="${title}" class="movie-item__image">

          <div class="movie-info-wrapper">
           <p class="movie-item__title">${shortTitle}</p>
           <p class="movie-info">${genres.slice(0, 2).join(', ')} | ${year}</p>
           </div>         
          </a>
   </li>`;
    })
    .join('');
  refs.moviesGallery.insertAdjacentHTML('beforeend', markup);

}, 300);
};

showPopularMovies();
