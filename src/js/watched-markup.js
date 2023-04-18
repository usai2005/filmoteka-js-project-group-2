import refs from './refs.js';

import api from './api-client.js';

import { loadFilms } from './local-storage.js';

import { appendMovies } from './render-functions.js';

// local storage watched key
const WATCHED_KEY = 'watched';

export async function markupWatched() {

  const watchedMoviesIds = loadFilms(WATCHED_KEY);

  console.log(watchedMoviesIds)

  console.log(watchedMoviesIds.length)

  if (watchedMoviesIds.length === 0) {
    
    refs.galleryContainer.style.display = "none";
  }

  let watchedMovies = [];

  watchedMoviesIds.map(async ({ id }) => {
    if (id) {
      // console.log(id);

      const chosenMovieByID = await api.getMovieById(id);

      watchedMovies.push(chosenMovieByID);
    }
  });

  appendMovies(watchedMovies);

  // //   placeholder (заглушка)
  // setTimeout(placeholderWatched,1000)

  // function placeholderWatched(){
  //   if (!watchedMovies.length) {
  //     refs.moviesGallery.innerHTML = ''

  //     refs.moviesGallery.innerHTML = `<li class="empty">
  // <img class="empty-library-image" src="https://cdn.icon-icons.com/icons2/576/PNG/512/icon_imovie_icon-icons.com_54880.png" alt="Empty gallery.Add something)" />
  // <p class="empty-library-notification">No movies here. Please add something to queue.</p>
  // </li>`;
  //   }
  // }

  }

