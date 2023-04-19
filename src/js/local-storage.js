import {
  loadLibrary,
  updateWatchedMarkup,
  updateQueueMarkup,
} from './routing-library-pages';

const dataStorage = {
  watched: [],
  queue: [],
};

let filmId = null;

//Перевірити наявність данних у сховищі
//Створити, якщо данні відсутні

function checkLocalStorage() {
  dataStorage.watched = JSON.parse(localStorage.getItem('watched') || '[]');
  dataStorage.queue = JSON.parse(localStorage.getItem('queue') || '[]');
}

checkLocalStorage();

// Слухачі на кнопки модалки

export function addModalButtonListeners() {
  const addToWatched = document.querySelector('#add-to-watched-btn');
  const addToQueue = document.querySelector('#add-to-queue-btn');
  const backdropElement = document.querySelector('.backdrop');
  filmId = backdropElement.dataset.id;

  addToWatched.addEventListener('click', onAddToWatched);
  addToQueue.addEventListener('click', onAddToQueue);

  if (isMovieExist(filmId, 'queue')) {
    addToQueue.textContent = 'Remove from Queue';
    addToQueue.classList.add('added');
  }
  if (isMovieExist(filmId, 'watched')) {
    addToWatched.textContent = 'Remove from Watched';
    addToWatched.classList.add('added');
  }
}

function isMovieExist(id, key) {
  const serializedState = JSON.parse(localStorage.getItem(key)) || [];
  return serializedState.some(obj => obj.id == id);
}

export function removeListeners() {
  const addToWatched = document.querySelector('#add-to-watched-btn');
  const addToQueue = document.querySelector('#add-to-queue-btn');

  addToWatched.removeEventListener('click', onAddToWatched);
  addToQueue.removeEventListener('click', onAddToQueue);
}

async function onAddToWatched() {
  const addToWatched = document.querySelector('#add-to-watched-btn');
  const filmId = document.querySelector('.backdrop').dataset.id;
  const film = await getMovieDetails(filmId);

  addToWatched.classList.toggle('added');

  if (addToWatched.classList.contains('added')) {
    addMovieToStorage('watched', film);
    addToWatched.textContent = 'Remove from Watched';
    // console.log('добавлено');
    updateWatchedMarkup();
  } else {
    removeMovieFromStorage('watched', filmId);
    addToWatched.textContent = 'Add to Watched';
    // console.log('удалено');
    updateWatchedMarkup();
  }
}

async function onAddToQueue() {
  const addToQueue = document.querySelector('#add-to-queue-btn');
  const filmId = document.querySelector('.backdrop').dataset.id;
  const film = await getMovieDetails(filmId);

  addToQueue.classList.toggle('added');

  if (addToQueue.classList.contains('added')) {
    addMovieToStorage('queue', film);
    addToQueue.textContent = 'Remove from Queue';
    updateQueueMarkup();
  } else {
    removeMovieFromStorage('queue', filmId);
    addToQueue.textContent = 'Add to Queue';
    updateQueueMarkup();
  }
}

// Взяти більше данних з API

async function getMovieDetails(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ae38d5c8baf36c9c4ca14e9456f3c0fd`
    );
    const data = await response.json();
    const film = {
      id: data.id,
      title: data.title,
      poster_path: data.poster_path,
      release_date: data.release_date,
    };
    return film;
  } catch (error) {
    console.error('Get movie details error: ', error.message);
  }
}

// Додати новий елемент в локальне сховище

function addMovieToStorage(key, film) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key)) || [];
    serializedState.push(film);
    localStorage.setItem(key, JSON.stringify(serializedState));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

// Видалити фільм з локального сховища

function removeMovieFromStorage(key, id) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key)) || [];
    const newFilms = serializedState.filter(obj => obj.id != id);
    localStorage.setItem(key, JSON.stringify(newFilms));
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

// Завантажити фільм з лoкального сховища

export function loadFilms(key) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key)) || [];
    const filmIds = serializedState.map(film => ({ id: film.id }));
    return filmIds;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
