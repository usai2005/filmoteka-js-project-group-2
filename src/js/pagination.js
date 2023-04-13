import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import apiClient from './api-client.js';
import refs from './refs.js';

// export const refs = {
//   searchForm: document.querySelector('form'),
//   homeBtn: document.querySelector('.btn-home'),
//   myLibraryBtn: document.querySelector('.btn-library'),
//   logo: document.querySelector('.page-logo'),
//   moviesGallery: document.querySelector('.movies-list'),
//   buttonsList: document.querySelector('.tui-pagination'),
// };

export const pagination = new Pagination(refs.buttonsList, {
  totalItems: apiClient.totalMovies,
  itemsPerPage: 20,
  visiblePages: 5,
  page: apiClient.curentPage,
});

// apiClient.getPopularMovie().then(movies => {
//   // console.log(movies);
//   // console.log(apiClient.totalMovies);
//   pagination.reset(apiClient.totalMovies);
//   appendMovies(movies);
// });

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

// //отримую масив фільмів відсортованих по рейтингу, роблю рендер фільмів
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
