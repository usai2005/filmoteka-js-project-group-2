const header = document.querySelector('.header');
const toggleClass = 'is-sticky';

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 400) {
    header.classList.add(toggleClass);
  } else {
    header.classList.remove(toggleClass);
  }
});
