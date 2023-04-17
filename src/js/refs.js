const refs = {
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-form__input'),
  formFailureMessage: document.querySelector('.search-form__message'),
  homeBtn: document.querySelector('#home-btn'),
  myLibraryBtn: document.querySelector('#library-btn'),
  logo: document.querySelector('.logo'),
  moviesGallery: document.querySelector('.movies-list'),
  filmStatusFilter: document.querySelector('.film-status-filter'),
  buttonsList: document.querySelector('.tui-pagination'),
  watchedBtn: document.querySelector('#watched-btn'),
  queueBtn: document.querySelector('#queue-btn'),
  openModalMovieEl: document.querySelector('[data-modal-movie-open]'),
  closeModalMovieBtn: document.querySelector('[data-modal-movie-close]'),
  modalMovie: document.querySelector('[data-modal-movie]'),
  modalMovieInf: document.querySelector('[data-modal-movie-inf]'),
  loader: document.querySelector('.preloader'),
  addToWatched: document.querySelector('#add-to-watched-btn'),
  addToQueue: document.querySelector('#add-to-queue-btn'),
  header: document.querySelector('.header'),
  footerLink: document.querySelector('.footer-link'),
  galleryContainer: document.querySelector('.gallery-container')
};

export default refs;
