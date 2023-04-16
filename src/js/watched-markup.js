import refs from './refs.js';

import api from './api-client.js';

import { loadFilms } from './local-storage.js';

import { appendMovies } from './render-functions.js';

// local storage watched key
const WATCHED_KEY = 'watched';

refs.watchedBtn.addEventListener('click', markupWatched);

async function markupWatched() {
  // if (
  //   !refs.watchedBtn.classList.contains('button--film-status-filter.is-active')
  // ) {
  //   refs.watchedBtn.classList.add('button--film-status-filter.is-active');

  //   // should add styles for .watched-queue-button--active!!!
  //   refs.watchedBtn.disabled = true;
  //   refs.queueBtn.classList.remove('button--film-status-filter.is-active');
  //   refs.queueBtn.disabled = false;
  // }

  const watchedMoviesIds = loadFilms(WATCHED_KEY);

  let watchedMovies = [];

  watchedMoviesIds.map(async ({ id }) => {
    if (id) {
      // console.log(id);

      const chosenMovieByID = await api.getMovieById(id);

      watchedMovies.push(chosenMovieByID);
    }
  });

  console.log(watchedMovies);

  //   placeholder (заглушка)
  // if (!watchedMovies.length) {
  //   refs.moviesGallery.innerHTML = `
  //             <li class="empty">
  //               <img class="empty-library-image" src="https://cdn.icon-icons.com/icons2/576/PNG/512/icon_imovie_icon-icons.com_54880.png" alt="Empty gallery.Add something)" />
  //               <p class="empty-library-notification">No movies here. Please mark something like watched.</p>
  //             </li>`;
  //   return;
  // }
  // should add styles for .empty!!!

  appendMovies(watchedMovies);
}
