import ApiClient from './api-client';
import refs from './refs';
import { showFailureMessage } from './failure-message';
import { pagination } from './pagination';
import { appendMovies } from './render-functions';
import { updateCurrentPage } from './routing-pages';

let searchRequest = '';

refs.searchForm.addEventListener('submit', formSubmitHandler);
refs.searchInput.addEventListener('focus', clearSearchInput);

function formSubmitHandler(event) {
  event.preventDefault();

  updateCurrentPage('query');

  refs.moviesGallery.innerHTML = '';

  searchRequest = refs.searchForm.searchQuery.value.toLowerCase().trim();

  if (searchRequest === '') {
    refs.paginationButtons.style.display = 'none';

    showFailureMessage();
    showFailureImage();
    return;
  }
  showMoviesByQuery(searchRequest);
}

async function showMoviesByQuery(query) {
  const moviesByQueryRequest = await ApiClient.getMovieByQuery(query);

  refs.paginationButtons.style.display = 'initial';

  if (ApiClient.totalMovies <= 20) {
    refs.paginationButtons.style.display = 'none';
  }
  if (moviesByQueryRequest.length === 0) {
    refs.paginationButtons.style.display = 'none';

    showFailureMessage();
    showFailureImage();
    return;
  }

  pagination.reset(ApiClient.totalMovies);

  appendMovies(moviesByQueryRequest);
}

export function clearSearchInput() {
  refs.searchForm.searchQuery.value = '';
}

function showFailureImage() {
    refs.galleryOps.innerHTML = '';
    refs.galleryOps.innerHTML = `<div>
  <img class="empty-library-image" src="https://pixabay.com/get/g87ce8a9ea045fc1f4d1f97a036419dcd32558ebaa3f275c3ae197f0026170be970aedd3474831d89eef633ede7df588f87bbf8d8a0f850c4b38b97cfd0b07323_1280.jpg" width="400" alt="404 error" />
  </div>`;
}

