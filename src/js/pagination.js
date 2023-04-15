import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import apiClient from './api-client.js';
import refs from './refs.js';

//щоб код запрацював(сторінки переключались) потрібно в ./render-functions.js експортувати appendMovies
import { appendMovies } from './render-functions.js';

export const pagination = new Pagination(refs.buttonsList, {
  totalItems: apiClient.totalMovies,
  itemsPerPage: 20,
  visiblePages: 5,
  page: apiClient.curentPage,
});

// Додаю слухач подій до екземпляра Pagination
pagination.on('beforeMove', async event => {
  // Get the page number that the user clicked on
  const pageNumber = event.page;

  // Використовую API, щоб отримати фільми для вибраного номера сторінки
  const movies = await apiClient.goToPage(pageNumber);

  // Відображаю фільми на сторінці
  // renderMovies(movies);
  appendMovies(movies);
});

// Допоміжна функція для відтворення фільмів на сторінці
// function renderMovies(movies) {
// Очищаю наявні фільми зі сторінки
//   refs.moviesGallery.innerHTML = '';

//   // Відображаю нові фільми на сторінці
//   movies.forEach(movie => {
//     // Створюю HTML для картки фільму
//     const movieCardHtml = `<div class="movie-card">
//         <img class="movie-card__image" src="${movie.imgUrl}" alt="${movie.title}">
//         <h2 class="movie-card__title">${movie.title} (${movie.year})</h2>
//         <p class="movie-card__genres">${movie.genres}</p>
//       </div>`;

//     // Додаю HTML картки фільму на сторінку
//     refs.moviesGallery.insertAdjacentHTML('beforeend', movieCardHtml);
//   });
// }

// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
// import apiClient from './ApiClient.js';

// const itemsPerPage = 20;
// let currentPage = 1;

// const pagination = new Pagination('pagination', {
//   totalItems: 0,
//   itemsPerPage,
//   visiblePages: 5,
//   page: currentPage,
//   centerAlign: true,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage:
//       '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-btn">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}-btn">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-btn tui-{{type}}-more">' +
//       '<span class="tui-ico-ellipses">{{type}}</span>' +
//       '</a>',
//   },
// });

// pagination.on('afterMove', event => {
//   const pageNumber = event.page;
//   apiClient.goToPage(pageNumber).then(movies => {
//     renderMovies(movies);
//     currentPage = pageNumber;
//   });
// });

// const renderMovies = movies => {
//   // render movies
// };

// apiClient.getPopularMovie().then(movies => {
//   pagination.setTotalItems(apiClient.totalMovies);
//   renderMovies(movies);
// });

// без використання бібліотеки
// отримую масив фільмів відсортованих по рейтингу, роблю рендер фільмів
// function pagination(objMovies) {
//   const postData = objMovies; //
//   let currentPage = 1;
//   let countMoviesOnPage = 20;

//   function displayList(arrData, countMoviesOnPage, page) {
//     const moviesEl = document.querySelector('.movies');
//     moviesEl.innerHTML = '';
//     page--;
//     const start = countMoviesOnPage * page;
//     const end = start + countMoviesOnPage;
//     const paginationData = arrData.slice(start, end);
//     paginationData.forEach(element => {
//       //тут ми рендерим кожну картку
//       const movieEl = document.createElement('div');
//       movieEl.classList.add('movie');
//       //   movieEl.innerHTML=${element}   -ренднр сторінки
//       moviesEl.appendChild(movieEl);
//     });
//   }

//   function displayPagination(arrData, countMoviesOnPage) {
//     const paginationEl = document.createElement('.pagination');
//     const pagesCount = Math.ceil(arrData.length / countMoviesOnPage);
//     const ulEl = document.createElement('ul');
//     ulEl.classList.add('pagination__list');

//     for (let index = 0; index < pagesCount; index++) {
//       const liEl = displayPaginationBtn(i + 1);
//       ulEl.appendChild(liEl);
//     }
//   }

//   function displayPaginationBtn(page) {
//     const liEl = document.createElement('li');
//     liEl.classList.add('pagination__list');
//     liEl.innerText = page;
//     if (currentPage == page) {
//       liEl.classList('pagination__item--active');
//     }

//     liEl.addEventListener('click', () => {
//       currentPage = page;
//       displayList(postData, countMoviesOnPage, currentPage);
//       let currentItemLi = document.querySelector('li.pagination__item--active');
//       currentItemLi.classList.remove("pagination__item--active")
//       liEl.classList.add("pagination__item--active")
//     });
//     return liEl;
//   }

//   displayList(postData, countMoviesOnPage, currentPage);
//   displayPagination(postData, countMoviesOnPage);
// }
