import refs from "./refs";
import { markupWatched } from "./watched-markup";
import { markupQueue } from './queue-markup';

refs.watchedBtn.addEventListener('click', loadWatchedPage);
refs.queueBtn.addEventListener('click', loadQueuePage);

let currentLibraryPage = '';

export function loadLibrary() {
    loadQueuePage();
}

function loadWatchedPage() { 
    // if (currentLibraryPage === 'watched') {
    //     return
    // };
    refs.moviesGallery.innerHTML = '';
    refs.galleryOps.innerHTML = '';
    makeInactiveQueueButton();
    makeActiveWatchedButton();
    //-------------------------------------Тимчасовий try catch поки в повній мірі не запрацює markupWatched
    try {
        markupWatched();
    } catch {
        console.log('Error in watched-markup.js');
    };
    //-------------------------------------------------------------------------------------------------------
    updateCurrentLibraryPage('watched');
}

function loadQueuePage() {
    // if (currentLibraryPage === 'queue') {
    //     return
    // };
    refs.moviesGallery.innerHTML = '';
    makeInactiveWatchedButton();
    makeActiveQueueButton();
    //--------------------------------------Тимчасовий try catch поки в повній мірі не запрацює markupQueue
    try {
        markupQueue();
    } catch {
        console.log('Error in queue-markup.js');
    };
    //------------------------------------------------------------------------------------------------------
    updateCurrentLibraryPage('queue');
}

function makeActiveWatchedButton() {
    if (refs.watchedBtn.classList.contains('is-active')) {
        return
    };
    refs.watchedBtn.classList.add('is-active');
}

function makeInactiveWatchedButton() {
    if (!refs.watchedBtn.classList.contains('is-active')) {
        return
    };
    refs.watchedBtn.classList.remove('is-active');
}

function makeActiveQueueButton() {
    if (refs.queueBtn.classList.contains('is-active')) {
        return
    };
    refs.queueBtn.classList.add('is-active');
}

function makeInactiveQueueButton() {
    if (!refs.queueBtn.classList.contains('is-active')) {
        return
    };
    refs.queueBtn.classList.remove('is-active');
}

function updateCurrentLibraryPage(pageName) {
    currentLibraryPage = pageName;
}