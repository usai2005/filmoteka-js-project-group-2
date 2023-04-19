import refs from './refs';
import { markupWatched } from './watched-markup';
import { markupQueue } from './queue-markup';

refs.watchedBtn.addEventListener('click', loadWatchedPage);
refs.queueBtn.addEventListener('click', loadQueuePageHandler);

let currentLibraryPage = '';

export function loadLibrary() {

   refs.paginationButtons.style.display = "none";

   loadQueuePage();
}

function loadWatchedPage() { 

    if (currentLibraryPage === 'watched') {
        return
    };
    refs.moviesGallery.innerHTML = '';
    refs.galleryOps.innerHTML = '';
    makeInactiveQueueButton();
    makeActiveWatchedButton();
    markupWatched();
    updateCurrentLibraryPage('watched');
}

function loadQueuePageHandler() {
    if (currentLibraryPage === 'queue') {
      
    return;

    };
    loadQueuePage()
};


function loadQueuePage() {

    refs.moviesGallery.innerHTML = '';

    makeInactiveWatchedButton();
    makeActiveQueueButton();
    markupQueue();
    updateCurrentLibraryPage('queue');
}

function makeActiveWatchedButton() {
  if (refs.watchedBtn.classList.contains('is-active')) {
    return;
  }
  refs.watchedBtn.classList.add('is-active');
}

function makeInactiveWatchedButton() {
  if (!refs.watchedBtn.classList.contains('is-active')) {
    return;
  }
  refs.watchedBtn.classList.remove('is-active');
}

function makeActiveQueueButton() {
  if (refs.queueBtn.classList.contains('is-active')) {
    return;
  }
  refs.queueBtn.classList.add('is-active');
}

function makeInactiveQueueButton() {
  if (!refs.queueBtn.classList.contains('is-active')) {
    return;
  }
  refs.queueBtn.classList.remove('is-active');
}

function updateCurrentLibraryPage(pageName) {
  currentLibraryPage = pageName;
}

///// перевірка і оновлення бабліотеки

export async function updateWatchedMarkup() {
  if (currentLibraryPage !== 'watched') {
    return;
  }
  refs.moviesGallery.innerHTML = '';
  markupWatched();
}
export async function updateQueueMarkup() {
  if (currentLibraryPage !== 'queue') {
    return;
  }
  refs.moviesGallery.innerHTML = '';
  markupQueue();
}
