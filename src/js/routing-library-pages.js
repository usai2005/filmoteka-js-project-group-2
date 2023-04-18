import refs from './refs';
import { markupWatched } from './watched-markup';
import { markupQueue } from './queue-markup';

refs.watchedBtn.addEventListener('click', loadWatchedPage);
refs.queueBtn.addEventListener('click', loadQueuePage);

let currentLibraryPage = '';

export function loadLibrary() {
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

function loadQueuePage() {
    if (currentLibraryPage === 'queue') {
        return
    };
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
