import refs from "./refs";
import { showPopularMovies } from "./render-functions";

// Імпорт функції, що рендерить Queue(чергу, так вирішили на міті) фільмів після кліку по кнопці Library
import markupQuoue from "./queue-markup"

let currentPage = '';
loadHomePage();


refs.logo.addEventListener('click', loadHomePage);
refs.homeBtn.addEventListener('click', loadHomePage);
refs.myLibraryBtn.addEventListener('click', loadLibraryPage);

export function loadHomePage() {
    if (currentPage === 'home') {
        return
    };
    refs.moviesGallery.innerHTML = '';
    showSearchForm();
    removeFilmStatusFilter();
    makeInactiveLibraryButton();
    makeActiveHomeButton();
    showPopularMovies();
    currentPage = 'home';
}

export function loadLibraryPage() {
    if (currentPage === 'library') {
        return
    };
    refs.moviesGallery.innerHTML = '';
    showFilmStatusFilter();
    removeSearchForm();
    makeInactiveHomeButton();
    makeActiveLibraryButton();

    // виклик фунції, що рендерить розмітку Queue з  даними від localstorage
    markupQuoue()

    currentPage = 'library';
}

function showSearchForm() {
    if (!refs.searchForm.classList.contains('is-hidden')) {
        return
    };
    refs.searchForm.classList.remove('is-hidden');
}

function removeSearchForm() {
    if (refs.searchForm.classList.contains('is-hidden')) {
        return
    };
    refs.searchForm.classList.add('is-hidden');
}

function showFilmStatusFilter() {
    if (!refs.filmStatusFilter.classList.contains('is-hidden')) {
        return
    };
    refs.filmStatusFilter.classList.remove('is-hidden');
}

function removeFilmStatusFilter() {
    if (refs.filmStatusFilter.classList.contains('is-hidden')) {
        return
    };
    refs.filmStatusFilter.classList.add('is-hidden');
}

function makeActiveHomeButton() {
    if (refs.homeBtn.classList.contains('is-active')) {
        return
    };
    refs.homeBtn.classList.add('is-active');
}

function makeInactiveHomeButton() {
    if (!refs.homeBtn.classList.contains('is-active')) {
        return
    };
    refs.homeBtn.classList.remove('is-active');
}

function makeActiveLibraryButton() {
    if (refs.myLibraryBtn.classList.contains('is-active')) {
        return
    };
    refs.myLibraryBtn.classList.add('is-active');
}

function makeInactiveLibraryButton() {
    if (!refs.myLibraryBtn.classList.contains('is-active')) {
        return
    };
    refs.myLibraryBtn.classList.remove('is-active');
}