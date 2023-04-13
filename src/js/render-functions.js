import refs from './refs.js';

function appendMovies(movies) {
  refs.moviesGallery.innerHTML = '';

  if (movies.length === 0) return;

  const markup = movies
    .map(({ title, imgUrl, genres, year, id }) => {
      return `
          <li class="movie-item" data-id="${id}">
          <img src="${imgUrl}" alt="${title}" class="movie-item__image">
          <p class="movie-item__title">${title}</p>
          <p class="movie-info">${genres} | ${year}</p>
  </li>`;
    })
    .join('');
  refs.moviesGallery.insertAdjacentHTML('beforeend', markup);
}
