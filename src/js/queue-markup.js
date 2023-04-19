import refs from './refs.js';

import api from './api-client.js';

import { pagination } from './pagination.js';

import { loadFilms } from './local-storage.js';

import { appendMovies } from './render-functions.js';

// local storage queue key
const QUEUE_KEY = 'queue';
const PER_PAGE = 20;

export async function getQueueMovies(page) {
  const queueMoviesIds = loadFilms(QUEUE_KEY);
  const from = PER_PAGE * (page - 1);
  const currentPageMoviesIds = queueMoviesIds.slice(from, from + PER_PAGE);

  const queueMoviesPromise = currentPageMoviesIds.map(({ id }) => {
    return api.getMovieById(id);
  });
  const movies = await Promise.all(queueMoviesPromise);

  return { movies, total: queueMoviesIds.length };
}

export async function markupQueue() {
  refs.galleryOps.innerHTML = '';

  refs.paginationButtons.style.display = 'none';

  const { movies, total } = await getQueueMovies(1);

  pagination.reset(total);

  if (total <= 20) {
    refs.paginationButtons.style.display = 'none';
  } else {
    refs.paginationButtons.style.display = 'initial';
  }

  appendMovies(movies);

  setTimeout(placeholderQueue, 500);
  function placeholderQueue() {
    if (!movies.length) {
      refs.galleryOps.innerHTML = '';
      refs.galleryOps.innerHTML = `
      <div>
    <img class="empty-library-image" src="https://cdn.icon-icons.com/icons2/576/PNG/512/icon_imovie_icon-icons.com_54880.png" width="400" alt="Empty gallery.Add something)" />
    </div>
    <p class="empty-library-notification">No movies here. Please add something to queue.</p>`;
    }
  }
}
