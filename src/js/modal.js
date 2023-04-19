import refs from './refs.js';
import api from './api-client.js';
import { addModalButtonListeners, removeListeners } from './local-storage.js';
import * as basicLightbox from 'basiclightbox';
import { showHeader, hideHeader } from './header.scroll.js';

refs.openModalMovieEl.addEventListener('click', onOpenModalMovie);
refs.closeModalMovieBtn.addEventListener('click', onCloseModalMovie);
refs.modalMovie.addEventListener('click', onBackdropClick);

export let currentId = null;

async function onOpenModalMovie(e) {
  if (!e.target.closest('.movie-item')) {
    return;
  }

  //hide stiky header
  hideHeader();

  const movieId = e.target.closest('.movie-item').dataset.id;

  if (currentId !== movieId) {
    currentId = movieId;

    const filmDetailsById = await api.getMovieById(movieId);

    // add movie id to modalMovie
    refs.modalMovie.dataset.id = filmDetailsById.id;

    renderModal(filmDetailsById);
  }

  const trailerKey = await api.getMoviesTrailer(movieId);

  window.addEventListener('keydown', onEscKeyPress);

  refs.modalMovie.classList.add('show-modal');
  document.querySelector('body').classList.add('modal-open');

  // local storage
  addModalButtonListeners();

  // create video player
  const trailer = basicLightbox.create(`
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  `);

  document.querySelector('.img.modal__image').onclick = () => {
    trailer.show();
  };

  window.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      trailer.close();
    }
  });
}

function renderModal(movieById) {
  refs.modalMovieInf.innerHTML = '';

  const {
    title,
    titleOriginal,
    popularity,
    vote,
    votes,
    w300imgUrl,
    w500imgUrl,
    genres,
    about,
  } = movieById;

  const markup = `<div class="modal__image-wrapper">
  <img
    srcset="${w300imgUrl} 300w, ${w500imgUrl} 500w"
    sizes="(max-width: 767px) 300px, (min-width: 768px) 500px"
    src="${w500imgUrl}"
    alt="${title}"
    class="img modal__image"
    loading = "lazy"
  />
  
  <button class='btn-trailer' type='button' aria-label='play movie trailer'>
      <svg class='btn-trailer__svg' width='68' height='48' viewBox='0 0 68 48'>
        <path
          class='btn-trailer__path'
          d='M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z'
          fill='#212121'
        ></path>
        <path d='M 45,24 27,14 27,34' fill='#fff'></path>
      </svg>
  </button>


</div>
<div class="modal__description">
  <strong class="modal__title">${title}</strong>
  <ul class="list modal__list list-modal">
    <li class="list-modal__item">
      <p class="list-modal__text list-modal__text--first">Vote / Votes</p>
      <p class="list-modal__text list-modal__text--second">
        <span class="vote vote--inverse">${vote.toFixed(
          1
        )}</span><span class="slash-line"> / </span><span class="vote">${votes}</span>
      </p>
    </li>
    <li class="list-modal__item">
      <p class="list-modal__text list-modal__text--first">Popularity</p>
      <p class="list-modal__text list-modal__text--second">${popularity.toFixed(
        1
      )}</p>
    </li>
    <li class="list-modal__item">
      <p class="list-modal__text list-modal__text--first">
        Original Title
      </p>
      <p class="list-modal__text list-modal__text--second">
        ${titleOriginal}
      </p>
    </li>
    <li class="list-modal__item">
      <p class="list-modal__text list-modal__text--first">Genre</p>
      <p class="list-modal__text list-modal__text--second">${genres}</p>
    </li>
  </ul>
  <p class="modal__after-title">About</p>
  <p class="modal__text">
    ${about}
  </p>
  <div class="modal__btn-wrapper">
    <button class="button modal-movie-button button--film-status-filter" id="add-to-watched-btn" type="button">add to Watched</button>
    <button class="button modal-movie-button button--film-status-filter" id="add-to-queue-btn" type="button">add to queue</button>
  </div>
</div>`;

  refs.modalMovieInf.insertAdjacentHTML('beforeend', markup);
}

function onCloseModalMovie() {
  window.removeEventListener('keydown', onEscKeyPress);

  refs.modalMovie.classList.remove('show-modal');
  document.querySelector('body').classList.remove('modal-open');

  //show stiky header
  showHeader();
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModalMovie();
  }
}

function onEscKeyPress(e) {
  const isEscKey = e.code === 'Escape';
  const trailerBox = document.querySelector('.basicLightbox');
  document.querySelector('body').classList.remove('modal-open');

  if (isEscKey && !trailerBox) {
    onCloseModalMovie();
  }
}
