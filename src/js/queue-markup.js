import refs from './refs.js';

import api from './api-client.js';

import { loadFilms } from './local-storage.js';

import { appendMovies } from './render-functions.js';

// local storage queue key
const QUEUE_KEY = 'queue';



export async function markupQueue() {
  refs.galleryOps.innerHTML = '';

  const queueMoviesIds = loadFilms(QUEUE_KEY);

  console.log(queueMoviesIds)

  console.log(queueMoviesIds.length)

  if (queueMoviesIds.length === 0) {
    
    refs.galleryContainer.style.display = "none";
  }

  let queueMovies = [];

  // refs.galleryContainer.style.display = "none";

  // document.getElementById('pagination').classList.add('visually-hidden');

  queueMoviesIds.map(async ({ id }) => {
    if (id) {

      // document.getElementById('pagination').classList.remove('visually-hidden');

      refs.galleryContainer.style.display = "initial";

      const chosenMovieByID = await api.getMovieById(id);

      queueMovies.push(chosenMovieByID);

    }
    
  });

  appendMovies(queueMovies);

  // placeholder (заглушка)
      setTimeout(placeholderQueue,500)

      function placeholderQueue(){
    if (!queueMovies.length) {
      refs.galleryOps.innerHTML = ''
      refs.galleryOps.innerHTML = `
      <div>
    <img class="empty-library-image" src="https://cdn.icon-icons.com/icons2/576/PNG/512/icon_imovie_icon-icons.com_54880.png" width="400" alt="Empty gallery.Add something)" />
    </div>
    <p class="empty-library-notification">No movies here. Please add something to queue.</p>`
    }
  }
}

