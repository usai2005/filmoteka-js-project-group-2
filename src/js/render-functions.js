import apiClient from './api-client.js';
import { pagination } from './pagination.js';
import refs from './refs.js';
import { showSpinnerIfPageLoads, hideSpinnerIfPageLoaded } from './loader.js';

async function showPopularMovies() {
  showSpinnerIfPageLoads();

  const movies = await apiClient.getPopularMovie();

  pagination.reset(apiClient.totalMovies);

  appendMovies(movies);
}

export function appendMovies(movies) {
  refs.moviesGallery.innerHTML = '';

  if (movies.length === 0) return;

  const markup = movies
    .map(({ title, imgUrl, genres, year, id }) => {
      const shortTitle =
        title.length <= 30 ? title : `${title.slice(0, 30)} ...`;
      return `
          <li class="movie-item list" data-id="${id}">
          <img src="${imgUrl}" alt="${title}" class="movie-item__image">
          <div class="movie-info-wrapper">
          <p class="movie-item__title">${shortTitle}</p>
          <p class="movie-info">${genres.slice(0, 2).join(', ')} | ${year}</p>
          </div>
          </li>`;
    })
    .join('');
  refs.moviesGallery.insertAdjacentHTML('beforeend', markup);
}

showPopularMovies();
