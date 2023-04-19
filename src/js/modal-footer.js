import refs from './refs.js';
import { showHeader, hideHeader } from './header.scroll.js';

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.modal.addEventListener('click', handleBackdropClick);

function onOpenModal() {
  hideHeader();
  window.addEventListener('keydown', handleEscKeyPress);
  document.querySelector('body').classList.add('modal-open');
  refs.modal.classList.remove('hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', handleEscKeyPress);
  refs.modal.classList.add('hidden');
}

function handleEscKeyPress(e) {
  const isEscKey = e.code === 'Escape';

  if (isEscKey) {
    showHeader();
    document.querySelector('body').classList.remove('modal-open');
    onCloseModal();
  }
}

function handleBackdropClick(e) {
  if (e.currentTarget === e.target) {
    showHeader();
    document.querySelector('body').classList.remove('modal-open');
    onCloseModal();
  }
}
