import refs from './refs.js';

// const toggleClass = 'is-sticky';

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 500) {
    // refs.header.classList.add('is-sticky', 'slide-down');
    refs.header.classList.add('is-sticky');
  } else {
    // refs.header.classList.add('slide-up');
    // setTimeout(() => {
    refs.header.classList.remove('is-sticky', 'slide-up');
    // }, 350);
    // refs.header.classList.remove('is-sticky', 'slide-up');
  }
});

// show-modal
//
refs.footerLink.addEventListener('click', () => {
  if (refs.header.classList.contains('is-sticky')) {
    refs.header.classList.remove('is-sticky');
  }
});
