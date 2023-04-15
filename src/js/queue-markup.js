import refs from './refs.js';

// import apiClient from './api-client.js';

import { loadFilms } from './local-storage.js';

import { appendMovies } from './render-functions.js';

// local storage queue key
const QUEUE_KEY = 'queue';

refs.queueBtn.addEventListener('click', markupQuoue);

// тимчасово такий масив(поки немає нічого від local storage)
// const queueMovies = [{ movie5 }, { movie6 }, { movie7 }, { movie8 }];
// const queueFilms = localStorage.load(QUEUE_KEY);

export function markupQuoue() {
  if (
    !refs.queueBtn.classList.contains('button--film-status-filter.is-active')
  ) {
    refs.queueBtn.classList.add('button--film-status-filter.is-active');
    queueRef.disabled = true;
    refs.watchedBtn.classList.remove('button--film-status-filter.is-active');
    refs.watchedBtn.disabled = false;
  }

  console.log(2);
  // перевірка роботи кнопки

  // should add styles for .watched-queue-button--active!!!

  //   placeholder (заглушка)
  if (!queueMovies.length) {
    refs.moviesGallery.innerHTML = `
              <li class="empty">
              <img class="empty-library-image" src="https://gifdb.com/gif/popcorn-brown-claymation-0sz0dt7bhumu7ifv.html?embed=true" alt="Empty gallery.Add something)" />
              <p class="empty-library-notification">No movies here. Please add something to queue.</p>
              </li>`;
    // should add styles for .empty!!!
    return;
  }
  appendMovies(queueMovies);
}
