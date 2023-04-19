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
    return;
  }

  pagination.reset(ApiClient.totalMovies);

  appendMovies(moviesByQueryRequest);
}

export function clearSearchInput() {
  refs.searchForm.searchQuery.value = '';
}
