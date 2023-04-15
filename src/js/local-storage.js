import refs from './refs.js';

const dataStorage = {
  watched: [],
  queue: [],
};


let filmId = null;

//Перевірити наявність данних у сховищі
//Створити, якщо данні відсутні

function checkLocalStorage() {
  if (!localStorage.getItem('watched')) {
    localStorage.setItem('watched', JSON.stringify(dataStorage.watched));
  }
  if (!localStorage.getItem('queue')) {
    localStorage.setItem('queue', JSON.stringify(dataStorage.queue));
  }
}

checkLocalStorage();

// Слухачі на кнопки модалки

export function addModalButtonListeners() {
  // Слухачі подій на кнопки
  refs.addToWatched.addEventListener('click', onAddToWathed);
  refs.addToQueue.addEventListener('click', onAddToQueue);
  // по кліку на кнопку витянути дата-атрибут з модалки
  filmId = refs.modalMovie.dataset.id;
  if (isMovieExist(filmId, 'queue')) {
    refs.addToQueue.textContent = "Remove from Queue";
    refs.addToQueue.classList.add('added');
  }
  if (isMovieExist(filmId, 'watched')) {
    refs.addToWatched.textContent = "Remove from Watched";
    refs.addToWatched.classList.add('added');
  }
}

function isMovieExist(id, key) {
  const serializedState = JSON.parse(localStorage.getItem(key));
  return  serializedState.find(obj => obj.id == id);
}

export function removeListeners() {
  refs.addToWatched.removeEventListener('click', onAddToWathed);
  refs.addToQueue.removeEventListener('click', onAddToQueue);
}

function onAddToWathed() {
  const film = getFilm(filmId); 
  refs.addToWatched.classList.toggle('added');
  if (refs.addToWatched.classList.contains("added")) {
    addMovieToStorage('watched', film);
    refs.addToWatched.textContent = "Remove from Watched";
  } else {
    removeMovieFromStorage('watched', filmId);
    refs.addToWatched.textContent = "Add to Watched";
  }
}

function onAddToQueue() {
  const film = getFilm(filmId); 
  refs.addToQueue.classList.toggle('added');
  if (refs.addToQueue.classList.contains("added")) {
    addMovieToStorage('queue', film);
    refs.addToQueue.textContent = "Remove from Queue";
  } else {
    removeMovieFromStorage('queue', filmId);
    refs.addToQueue.textContent = "Add to Queue";
  }
}

// Завантажити фільм з таким же айді з лoкального сховища

function getFilm(id) {
  const films = loadFilms();
  return films.find(obj => obj.id == id);
}

export function loadFilms(key) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key));
    const films = serializedState.results.results;
    return films;
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
// Додати новий елемент в локальне сховище

function addMovieToStorage(key, value) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key));
    serializedState.push(value);
    localStorage.setItem(key, JSON.stringify(serializedState))
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

// Видалити фільм
function removeMovieFromStorage(key, id) {
  try {
    const serializedState = JSON.parse(localStorage.getItem(key));
    const newFilms = serializedState.filter(obj => obj.id != id)
    localStorage.setItem(key, JSON.stringify(newFilms))

  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
