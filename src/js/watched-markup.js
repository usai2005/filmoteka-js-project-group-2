import refs from './refs.js';

import api from './api-client.js';

import { pagination } from './pagination.js';

import { loadFilms } from './local-storage.js';

import { appendMovies } from './render-functions.js';

// local storage watched key
const WATCHED_KEY = 'watched';
const PER_PAGE = 20;

export async function getWatchedMovies(page) {
  const watchedMoviesIds = loadFilms(WATCHED_KEY);
  const from = PER_PAGE * (page - 1);
  const currentPageMoviesIds = watchedMoviesIds.slice(from, from + PER_PAGE);

  const watchedMoviesPromise = currentPageMoviesIds.map(({ id }) => {
    return api.getMovieById(id);
  });
  const movies = await Promise.all(watchedMoviesPromise);

  return { movies, total: watchedMoviesIds.length };
}

export async function markupWatched() {
  refs.galleryOps.innerHTML = '';

  const { movies, total } = await getWatchedMovies(1);

  pagination.reset(total);
  if (total <= 20) {
    refs.paginationButtons.style.display = 'none';
  } else {
    refs.paginationButtons.style.display = 'initial';
  }

  appendMovies(movies);
  //   placeholder (заглушка)
  setTimeout(placeholderWatched, 500);

  function placeholderWatched() {
    if (!movies.length) {
      refs.galleryOps.innerHTML = '';

      refs.galleryOps.innerHTML = `<div>
    <img class="empty-library-image" src="https://cdn.icon-icons.com/icons2/576/PNG/512/icon_imovie_icon-icons.com_54880.png" width="400" alt="Empty gallery.Add something)" />
    </div>
    <p class="empty-library-notification">No movies here. Please mark something like watched.</p>`;
    }
  }
}
