import refs from './refs.js';
import api from './api-client.js';
import { addModalButtonListeners, removeListeners} from './local-storage.js';

refs.openModalMovieEl.addEventListener('click', onOpenModalMovie);
refs.closeModalMovieBtn.addEventListener('click', onCloseModalMovie);
refs.modalMovie.addEventListener('click', onBackdropClick);

let currentId = null;

async function onOpenModalMovie(e) {
  if (!e.target.closest('.movie-item')) {
    return;
  }

  const movieId = e.target.closest('.movie-item').dataset.id;

  if (currentId !== movieId) {
    currentId = movieId;

    const filmDetailsById = await api.getMovieById(movieId);
    // console.log('filmDetailsById', filmDetailsById);

    // add movie id to modalMovie
    refs.modalMovie.dataset.id = filmDetailsById.id;

    renderModal(filmDetailsById);

    // local storage
    addModalButtonListeners();
  }

  window.addEventListener('keydown', onEscKeyPress);

  refs.modalMovie.classList.add('show-modal');
}

function renderModal(movieById) {
  refs.modalMovieInf.innerHTML = '';

  // console.log('movies', movieById);

  const { title, popularity, vote, votes, imgUrl, genres, about, id } =
    movieById;

  const markup = `<div class="modal__image-wrapper"><img
  class="img modal__image"
  src="${imgUrl}"
  alt="${title}"
  loading="lazy"
/></div>
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
        ${title}
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
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModalMovie();
  }
}

function onEscKeyPress(e) {
  const isEscKey = e.code === 'Escape';
  if (isEscKey) {
    onCloseModalMovie();
  }
}
