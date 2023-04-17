import refs from './refs.js';

import api from './api-client.js';

import { loadFilms } from './local-storage.js';

import { appendMovies } from './render-functions.js';

// local storage queue key
const QUEUE_KEY = 'queue';



export async function markupQueue() {

  const queueMoviesIds = loadFilms(QUEUE_KEY);

  let queueMovies = [];

  queueMoviesIds.map(async ({ id }) => {
    if (id) {

      const chosenMovieByID = await api.getMovieById(id);

      queueMovies.push(chosenMovieByID);
    }
  });

  console.log(queueMovies);

  appendMovies(queueMovies);

  // placeholder (заглушка)
  //     setTimeout(placeholderQueue,1000)

  //     function placeholderQueue(){
  //   if (!queueMovies.length) {
  //     refs.moviesGallery.innerHTML = ''
  //     refs.moviesGallery.innerHTML = `<li class="empty">
  //   <img class="empty-library-image" src="https://cdn.icon-icons.com/icons2/576/PNG/512/icon_imovie_icon-icons.com_54880.png" alt="Empty gallery.Add something)" />
  //   <p class="empty-library-notification">No movies here. Please add something to queue.</p>
  //   </li>`
  //   }
  // }
}

