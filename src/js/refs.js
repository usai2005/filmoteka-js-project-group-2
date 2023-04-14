const refs = {
  searchForm: document.querySelector('form'),
  homeBtn: document.querySelector('.btn-home'),
  myLibraryBtn: document.querySelector('.btn-library'),
  logo: document.querySelector('.page-logo'),
  moviesGallery: document.querySelector('.movies-list'),
  buttonsList: document.querySelector('.tui-pagination'),
  watchedBtn: document.querySelector('#watched-btn'),
  queueBtn: document.querySelector('#queue-btn'),
  openModalMovieEl: document.querySelector('[data-modal-movie-open]'),
  closeModalMovieBtn: document.querySelector('[data-modal-movie-close]'),
  modalMovie: document.querySelector('[data-modal-movie]'),
  modalMovieInf: document.querySelector('[data-modal-movie-inf]'),
  loader: document.querySelector('.preloader'),
};


export default refs;
