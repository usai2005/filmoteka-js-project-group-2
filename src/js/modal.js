function onOpenModal(e) {
    console.log(e.target.nodeName);

    if (e.target.nodeName !== "LI") {
      return;
    }

    const movieId = e.target.dataset.id;
    console.log(movieId);


    window.addEventListener("keydown", onEscKeyPress);

    document.querySelector("[data-modal]").classList.add("show-modal");
}

function onCloseModal() {
  window.removeEventListener("keydown", onEscKeyPress);

  document.querySelector("[data-modal]").classList.remove("show-modal");
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  const isEscKey = e.code === "Escape";
  if (isEscKey) {
    onCloseModal();
  }
}

export {onOpenModal, onCloseModal, onBackdropClick};

// add to index.js
// import {onOpenModal, onCloseModal, onBackdropClick} from './js/modal';

// refs.openModalCard.addEventListener("click", onOpenModal);
// refs.closeModalBtn.addEventListener("click", onCloseModal);
// refs.backdrop.addEventListener("click", onBackdropClick);

// add to refs
// openModalCard: document.querySelector("[data-modal-open]"),
// closeModalBtn: document.querySelector("[data-modal-close]"),
// backdrop: document.querySelector("[data-modal]"),