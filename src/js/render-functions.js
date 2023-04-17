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
// чомусь це не працює (не очищає галерею перед рендером)
refs.moviesGallery.innerHTML = '';

if (movies.length === 0 || movies === undefined) {

  refs.moviesGallery.insertAdjacentHTML('afterend',
    `<div class="main-gallery-oops">
      <div>
        <img src="https://cdn.icon-icons.com/icons2/576/PNG/512/icon_imovie_icon-icons.com_54880.png">
      </div>
        <p><strong><span>Oops!</span> Something went wrong</strong></p>
    </div>`);
  return;

}

  const markup = movies
    .map(({ title, w300imgUrl, w500imgUrl, genres, year, id }) => {


      const moveiGenres = typeof genres === 'string'? genres : genres.join(', ') 

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
           <p class="movie-info">${moveiGenres.slice(0, 2)} | ${year}</p>
          </div>
          </li>`;
    })
    .join('');
  refs.moviesGallery.insertAdjacentHTML('beforeend', markup);

}, 300);
};
