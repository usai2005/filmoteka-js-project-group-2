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
    refs.moviesGallery.innerHTML = '';
    searchRequest = refs.searchForm.searchQuery.value.toLowerCase().trim();

    if (searchRequest === '') {
        showFailureMessage();
        return
    };
    showMoviesByQuery(searchRequest);
    updateCurrentPage('query');
}

async function showMoviesByQuery (query) {
    const moviesByQueryRequest = await ApiClient.getMovieByQuery(query);
    if (moviesByQueryRequest.length === 0) {
        showFailureMessage();
        return;
    }
    pagination.reset(ApiClient.totalMovies);
    appendMovies(moviesByQueryRequest);
}

export function clearSearchInput() {
    refs.searchForm.searchQuery.value ='';
}