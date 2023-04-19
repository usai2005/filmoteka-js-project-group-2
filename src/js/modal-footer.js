import refs from './refs.js';

// refs.openModalBtn.addEventListener("click", toggleModal);
// refs.closeModalBtn.addEventListener("click", toggleModal);

// function toggleModal() {
//   refs.modal.classList.toggle("hidden");
// };

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.modal.addEventListener('click', handleBackdropClick);

function onOpenModal() {
  window.addEventListener('keydown', handleEscKeyPress);

  refs.modal.classList.remove('hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', handleEscKeyPress);

  refs.modal.classList.add('hidden');
}

function handleEscKeyPress(e) {
  const isEscKey = e.code === 'Escape';

  if (isEscKey) {
    onCloseModal();
  }
}

function handleBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}
