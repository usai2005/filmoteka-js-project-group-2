import refs from './refs.js';

// const toggleClass = 'is-sticky';

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 400) {
    refs.header.classList.add('is-sticky', 'slide-down');
  } else {
    refs.header.classList.remove('is-sticky', 'slide-down');
  }
});

// show-modal
//
refs.footerLink.addEventListener('click', () => {
  if (refs.header.classList.contains('is-sticky')) {
    refs.header.classList.remove('is-sticky');
  }
});
