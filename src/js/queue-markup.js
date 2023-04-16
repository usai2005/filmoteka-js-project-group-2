import refs from './refs.js';

import api from './api-client.js';

import { loadFilms } from './local-storage.js';

import { appendMovies } from './render-functions.js';

// local storage queue key
const QUEUE_KEY = 'queue';

refs.queueBtn.addEventListener('click', markupQuoue);


export async function markupQuoue() {
  // if (
  //   !refs.queueBtn.classList.contains('button--film-status-filter.is-active')
  // ) {
  //   refs.queueBtn.classList.add('button--film-status-filter.is-active');
  //   queueRef.disabled = true;
  //   refs.watchedBtn.classList.remove('button--film-status-filter.is-active');
  //   refs.watchedBtn.disabled = false;
  // }

  const queueMoviesIds = loadFilms(QUEUE_KEY);

  let queueMovies = [];

  queueMoviesIds.map(async ({ id }) => {
    if (id) {
      // console.log(id);

      const chosenMovieByID = await api.getMovieById(id);

      queueMovies.push(chosenMovieByID);
    }
  });

  console.log(queueMovies);



  // should add styles for .watched-queue-button--active!!!

  //   placeholder (заглушка)
  // if (!queueMovies.length) {
  //   refs.moviesGallery.innerHTML = `
  //             <li class="empty">
  //             <img class="empty-library-image" src="https://cdn.icon-icons.com/icons2/576/PNG/512/icon_imovie_icon-icons.com_54880.png" alt="Empty gallery.Add something)" />
  //             <p class="empty-library-notification">No movies here. Please add something to queue.</p>
  //             </li>`;
  //   // should add styles for .empty!!!
  //   return;
  // }
  appendMovies(queueMovies);
}
