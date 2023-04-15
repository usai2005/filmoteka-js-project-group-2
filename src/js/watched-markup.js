import refs from './refs.js';

// import apiClient from './api-client.js';

import { loadFilms } from './local-storage.js';

import { appendMovies } from './render-functions.js';

// local storage watched key
const WATCHED_KEY = 'watched';

refs.watchedBtn.addEventListener('click', markupWatched);


// тимчасово такий масив(поки немає нічого від local storage)
const watchedMovies = [{ movie1 }, { movie2 }, { movie3 }, { movie4 }];
// const watchedMovies = localStorage.load(WATCHED_KEY);


function markupWatched() {
  const watchedMovies = localStorage.load(WATCHED_KEY);

  if (!refs.watchedBtn.classList.contains('button--film-status-filter.is-active')) {
    refs.watchedBtn.classList.add('button--film-status-filter.is-active');

    console.log(1);
    // перевірка роботи кнопки

    // should add styles for .watched-queue-button--active!!!
    refs.watchedBtn.disabled = true;
    refs.queueBtn.classList.remove('button--film-status-filter.is-active');
    refs.queueBtn.disabled = false;
  }

  //   placeholder (заглушка)
  if (!watchedMovies?.length) {
    refs.moviesGallery.innerHTML = `
              <li class="empty">
                <img class="empty-library-image" src="https://gifdb.com/gif/popcorn-brown-claymation-0sz0dt7bhumu7ifv.html?embed=true" alt="Empty gallery.Add something)" />
                <p class="empty-library-notification">No movies here. Please mark something like watched.</p>
              </li>`;
    return;
  }
  // should add styles for .empty!!!

  appendMovies(watchedMovies);
}
