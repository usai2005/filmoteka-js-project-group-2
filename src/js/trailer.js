import refs from './refs.js';
import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import api from './api-client.js';

export default function onTrailerClick() {
  refs.moviesGallery.addEventListener('click', watchTrailer);
}

// Click event listener //

export let key = '';

async function watchTrailer(e) {
  e.preventDefault();
  key = '';
  // if (
  //   e.target
  //     .closest('.backdrop.show-modal')
  //     ?.querySelector('.img.modal__image') === undefined
  // ) {
  //   return;
  // }
  await api
    .getMoviesTrailer(e.target.parentNode.dataset.id)
    // fetchTrailer(e.target.closest('.card__link').id)
    .then(data => {
      console.log(data);
      // renderTrailer(data);
      key = data;
    })
    .catch(error => {
      console.log(error);
    });
}
