import refs from './refs.js';
import axios from 'axios';

import * as basicLightbox from 'basiclightbox'


let trailer;

export default function onTrailerClick() {
  refs.moviesGallery.addEventListener('click', watchTrailer);
}

// Click event listener //
function watchTrailer(e) {
  e.preventDefault();
  if (e.target.closest('.card__link')?.querySelector('movie-item__image') === undefined) {
    return;
  }

  fetchTrailer(e.target.closest('.card__link').id)
    .then(renderTrailer)
    .catch(error => {
      console.log(error);
    });
}

// Выбрать фильм по ID // Ключ API (v3 auth) 9218a8fe57d9a10810e7b861ea45534f //
function fetchTrailer(filmID, lang) {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${filmID}/videos?api_key=9218a8fe57d9a10810e7b861ea45534f&language=${lang}`,
    )
    .then(response => response.data)
    .then(data => {
      return data.results;
    });
}

// Визуализировать модальный трейлер //
function renderTrailer(data) {
  let key = '';
  data.forEach(obj => {
    if (obj.name.includes('Official')) {
      key = obj.key;
    }
  });

  creatTrailerLink(key);

  // Закрыть трейлер от Escape //
  window.addEventListener('keydown', closeTrailerByEsc);
  function closeTrailerByEsc(e) {
    if (e.code === 'Escape') {
      trailer.close();
      window.removeEventListener('keydown', closeTrailerByEsc);
    }
  }
}

function creatTrailerLink(key) {
  trailer = basicLightbox.create(`
    <iframe width="320" height="240" src='https://www.youtube.com/embed/${key}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trailer_video"></iframe>
  `);

  setTimeout(() => {
    const trailerBtn = document.querySelector('.img modal__image');
    trailerBtn.addEventListener('click', showTrailer);
  }, 300);

  function showTrailer() {
    trailer.show();
  }
}