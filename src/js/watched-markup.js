import refs from './refs.js';

import api from './api-client.js';

import { loadFilms } from './local-storage.js';

import { appendMovies } from './render-functions.js';

// local storage watched key
const WATCHED_KEY = 'watched';

export async function markupWatched() {
  refs.galleryOps.innerHTML = ''

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

  // //   placeholder (заглушка)
  setTimeout(placeholderWatched,500)

  function placeholderWatched(){
    if (!watchedMovies.length) {
      refs.galleryOps.innerHTML = ''

      refs.galleryOps.innerHTML = `<div>
  <img class="empty-library-image" src="https://cdn.icon-icons.com/icons2/576/PNG/512/icon_imovie_icon-icons.com_54880.png" width="400" alt="Empty gallery.Add something)" />
  </div>
  <p class="empty-library-notification">No movies here. Please mark something like watched.</p>`
    }
  }

  }

