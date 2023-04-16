const dataStorage = {
  watched: [],
  queue: [],
};

let filmId = null;

//Перевірити наявність данних у сховищі
//Створити, якщо данні відсутні

function checkLocalStorage() {
  dataStorage.watched = JSON.parse(localStorage.getItem('watched') || "[]");
  dataStorage.queue = JSON.parse(localStorage.getItem('queue') || "[]");
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
    addToQueue.textContent = "Remove from Queue";
    addToQueue.classList.add('added');
  }
  if (isMovieExist(filmId, 'watched')) {
    addToWatched.textContent = "Remove from Watched";
    addToWatched.classList.add('added');
  }
  
  // const filmData = {
  //   id: filmId
  // };

  // addMovieToStorage('films', filmData);
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

function onAddToWatched() {
  const addToWatched = document.querySelector('#add-to-watched-btn');
  const filmId = document.querySelector('.backdrop').dataset.id;
  const film = getFilm(filmId); 

  addToWatched.classList.toggle('added');

  if (addToWatched.classList.contains("added")) {
    addMovieToStorage('watched', film);
    addToWatched.textContent = "Remove from Watched";
  } else {
    removeMovieFromStorage('watched', filmId);
    addToWatched.textContent = "Add to Watched";
  }
}

function onAddToQueue() {
  const addToQueue = document.querySelector('#add-to-queue-btn');
  const filmId = document.querySelector('.backdrop').dataset.id;
  const film = getFilm(filmId); 

  addToQueue.classList.toggle('added');

  if (addToQueue.classList.contains("added")) {
    addMovieToStorage('queue', film);
    addToQueue.textContent = "Remove from Queue";
  } else {
    removeMovieFromStorage('queue', filmId);
    addToQueue.textContent = "Add to Queue";
  }
}

// Завантажити фільм з таким же айді з лoкального сховища

function getFilm(id) {
  const films = loadFilms();
  return films.find(obj => obj.id == id) || { id };
}

export function loadFilms(key = '') {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key)) || [];
    const films = serializedState || [];
    return films;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

// Додати новий елемент в локальне сховище

function addMovieToStorage(key, film) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key)) || [];
    serializedState.push({ id: film.id });
    localStorage.setItem(key, JSON.stringify(serializedState));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

// Видалити фільм

function removeMovieFromStorage(key, id) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key)) || [];
    const newFilms = serializedState.filter(obj => obj.id != id);
    localStorage.setItem(key, JSON.stringify(newFilms));
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}