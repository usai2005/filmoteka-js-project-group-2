import apiClient from './api-client.js';
import { pagination } from './pagination.js';
import refs from './refs.js';
import { showSpinnerIfPageLoads } from './loader.js';

export async function showPopularMovies() {
  const movies = await apiClient.getPopularMovie();

  pagination.reset(apiClient.totalMovies);

  appendMovies(movies);
}

export function appendMovies(movies) {
  refs.loader.classList.remove('preloader__loader--page-loaded');

  showSpinnerIfPageLoads();
  
  setTimeout(() => {
    if (movies.length === 0 || movies === undefined) {
    
      return;
    }
  }, 500);

  setTimeout(() => {
    const markup = movies
      .map(({ title, w300imgUrl, w500imgUrl, genres, year, id }) => {
        const shortTitle =
          title.length <= 30 ? title : `${title.slice(0, 30)} ...`;

        return `<li class="movie-item list" data-id="${id}">
          <img
            srcset="${w300imgUrl} 300w, ${w500imgUrl} 500w"
            sizes="(max-width: 767px) 300px, (min-width: 768px) 500px"
            src="${w500imgUrl}"
            alt="${title}"
            class="movie-item__image"
            loading = "lazy"
          />
          <div class="movie-info-wrapper">
           <p class="movie-item__title">${shortTitle}</p>
           <p class="movie-info">${genres} | ${year}</p>
          </div>
          </li>`;
      })
      .join('');
    refs.moviesGallery.innerHTML = '';
    refs.moviesGallery.insertAdjacentHTML('beforeend', markup);
  }, 300);
}
