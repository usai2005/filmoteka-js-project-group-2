import refs from './refs';
import { appendMovies, showPopularMovies } from './render-functions';
import { pagination } from './pagination';
import { loadLibrary } from './routing-library-pages';
import { clearSearchInput } from './search-by-query';
import { loadFilms } from './local-storage.js';

let currentPage = '';
loadHomePage();



refs.logo.addEventListener('click', loadHomePageByLogoClick);

refs.homeBtn.addEventListener('click', loadHomePage);
refs.myLibraryBtn.addEventListener('click', loadLibraryPage);

function loadHomePageByLogoClick(e) {
    e.preventDefault();
    loadHomePage();
}

export function loadHomePage() {
 
    clearSearchInput();
  
    refs.paginationButtons.style.display = "initial";
    
    if (currentPage === 'home') {
        
        return
    };
    
    refs.moviesGallery.innerHTML = '';
    refs.galleryOps.innerHTML = '';


    showSearchForm();
    removeFilmStatusFilter();
    makeInactiveLibraryButton();
    makeActiveHomeButton();
    showPopularMovies();
    updateCurrentPage('home');

    // refs.paginationButtons.style.display = "none";
}

export function loadLibraryPage() {

    clearSearchInput();
    if (currentPage === 'library') {
        return
    };
    refs.moviesGallery.innerHTML = '';
    refs.galleryOps.innerHTML = '';
    showFilmStatusFilter();
    removeSearchForm();
    makeInactiveHomeButton();
    makeActiveLibraryButton();
    loadLibrary();
    updateCurrentPage('library');
}

function showSearchForm() {
  if (!refs.searchForm.classList.contains('is-hidden')) {
    return;
  }
  refs.searchForm.classList.remove('is-hidden');
}

function removeSearchForm() {
  if (refs.searchForm.classList.contains('is-hidden')) {
    return;
  }
  refs.searchForm.classList.add('is-hidden');
}

function showFilmStatusFilter() {
  if (!refs.filmStatusFilter.classList.contains('is-hidden')) {
    return;
  }
  refs.filmStatusFilter.classList.remove('is-hidden');
}

function removeFilmStatusFilter() {
  if (refs.filmStatusFilter.classList.contains('is-hidden')) {
    return;
  }
  refs.filmStatusFilter.classList.add('is-hidden');
}

function makeActiveHomeButton() {
  if (refs.homeBtn.classList.contains('is-active')) {
    return;
  }
  refs.homeBtn.classList.add('is-active');
}

function makeInactiveHomeButton() {
  if (!refs.homeBtn.classList.contains('is-active')) {
    return;
  }
  refs.homeBtn.classList.remove('is-active');
}

function makeActiveLibraryButton() {
  if (refs.myLibraryBtn.classList.contains('is-active')) {
    return;
  }
  refs.myLibraryBtn.classList.add('is-active');
}

function makeInactiveLibraryButton() {
  if (!refs.myLibraryBtn.classList.contains('is-active')) {
    return;
  }
  refs.myLibraryBtn.classList.remove('is-active');
}

export function updateCurrentPage(pageName) {
  currentPage = pageName;
}
