import refs from './refs.js';

import api from './api-client.js';

import { loadFilms } from './local-storage.js';

import { appendMovies } from './render-functions.js';

// local storage watched key
const WATCHED_KEY = 'watched';

refs.watchedBtn.addEventListener('click', markupWatched);

async function markupWatched() {
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

  appendMovies(watchedMovies);

  //   placeholder (заглушка)
  setTimeout(placeholderIfEmpty, 500);

  function placeholderIfWatchedEmpty() {
    if (!watchedMovies.length) {
      refs.moviesGallery.innerHTML = `<li class="empty">
  <img class="empty-library-image" src="https://cdn.icon-icons.com/icons2/576/PNG/512/icon_imovie_icon-icons.com_54880.png" alt="Empty gallery.Add something)" />
  <p class="empty-library-notification">No movies here. Please add something to queue.</p>
  </li>`;
    }
  }
}
