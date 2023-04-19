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

export function showHeader() {
  if (
    refs.header.classList.contains('is-sticky') &&
    window.pageYOffset > 550 &&
    refs.header.classList.contains('slide-up')
  ) {
    refs.header.classList.remove('slide-up');
  }
}

export function hideHeader() {
  if (refs.header.classList.contains('is-sticky')) {
    refs.header.classList.add('slide-up');
  }
}
