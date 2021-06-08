import Modal from './modal.js';

class DeleteConfirmationView extends Modal {
  parentElement = document.querySelector('.notes-container');
  window = document.querySelector('.confirm-delete-window');
  overlay = document.querySelector('.overlay-confirm-delete');
  btnConfirm = document.querySelector('.btn-confirm');
  btnCanсel = document.querySelector('.btn-cancel');

  constructor() {
    super();
  }

  addHandlerDeleteNote(handler) {
    this.parentElement.addEventListener('click', (e) => {
      const target = e.target;
      const btnDelete = target.closest('.btn-delete-note');
      if (btnDelete) {
        const note = btnDelete.closest('.note');
        const noteId = note.getAttribute('id');
        handler(noteId);
      }
    });
  }

  addHandlerDeleteConfirm(handler) {
    this.btnConfirm.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    });
  }

  addHandlerDeleteCancel(handler) {
    this.btnCanсel.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new DeleteConfirmationView();
