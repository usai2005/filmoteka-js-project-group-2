import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import apiClient from './api-client.js';
import refs from './refs.js';
import { appendMovies } from './render-functions.js';

export const pagination = new Pagination(refs.buttonsList, {
  totalItems: apiClient.totalMovies,
  itemsPerPage: 20,
  visiblePages: 5,
  page: apiClient.curentPage,
  centerAlign: true,
});

console.log(pagination)

// Додаю слухач подій до екземпляра Pagination
pagination.on('beforeMove', async event => {
  // Get the page number that the user clicked on
  const pageNumber = event.page;

  // Використовую API, щоб отримати фільми для вибраного номера сторінки
  const movies = await apiClient.goToPage(pageNumber);

  // Відображаю фільми на сторінці
  appendMovies(movies);
});
pagination.on('afterMove', async ({ page }) => {
  // window.scroll({ top: 0, behavior: 'smooth' });
  refs.moviesGallery.innerHTML = '';
});
