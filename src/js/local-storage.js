const dataStorage = {
  watched: [],
  queue: [],
};

let filmId = null;
let saveData = {}; // зберігаються в массив 'Value'

//Перевірити наявність данних у сховищі
//Створити, якщо данні відсутні

function checkLocalStorage() {
  localStorage.setItem('watched', JSON.stringify(dataStorage.watched || []));
  localStorage.setItem('queue', JSON.stringify(dataStorage.queue || []));
}

checkLocalStorage();

// Слухачі на кнопки модалки

export function addModalButtonListeners() {
  saveData = {
    modal: document.getElementsByClassName('backdrop')[0],
    addToWatched: document.getElementById('add-to-watched-btn'),
    addToQueue: document.getElementById('add-to-queue-btn'),
  };

  filmId = saveData.modal.dataset.id;
  console.log(filmId);

  saveData.addToWatched.addEventListener('click', onAddToWatched);
  saveData.addToQueue.addEventListener('click', onAddToQueue);

  if (isMovieExist(filmId, 'queue')) {
    saveData.addToQueue.textContent = "Remove from Queue";
    saveData.addToQueue.classList.add('added');
  }
  if (isMovieExist(filmId, 'watched')) {
    saveData.addToWatched.textContent = "Remove from Watched";
    saveData.addToWatched.classList.add('added');
  }
}

function isMovieExist(id, key) {
  const serializedState = JSON.parse(localStorage.getItem(key)) || [];
  return serializedState.some(obj => obj.id == id);
}

export function removeListeners() {
  saveData.addToWatched.removeEventListener('click', onAddToWatched);
  saveData.addToQueue.removeEventListener('click', onAddToQueue);
}

function onAddToWatched() {
  const filmId = saveData.modal.dataset.id;
  const film = getFilm(filmId); 

  saveData.addToWatched.classList.toggle('added');

  if (saveData.addToWatched.classList.contains("added")) {
    addMovieToStorage('watched', film);
    saveData.addToWatched.textContent = "Remove from Watched";
  } else {
    removeMovieFromStorage('watched', filmId);
    saveData.addToWatched.textContent = "Add to Watched";
  }
}

function onAddToQueue() {
  const filmId = saveData.modal.dataset.id;
  const film = getFilm(filmId); 

  saveData.addToQueue.classList.toggle('added');

  if (saveData.addToQueue.classList.contains("added")) {
    addMovieToStorage('queue', film);
    saveData.addToQueue.textContent = "Remove from Queue";
  } else {
    removeMovieFromStorage('queue', filmId);
    saveData.addToQueue.textContent = "Add to Queue";
  }
}

// Завантажити фільм з таким же айді з лoкального сховища

function getFilm(id) {
  const films = loadFilms();
  return films.find(obj => obj.id == id) || {};
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
    serializedState.push(film);
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