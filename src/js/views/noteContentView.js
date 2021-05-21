import Modal from './modal.js';

class NoteContentView extends Modal {
  parentElement = document.querySelector('.notes-container');
  window = document.querySelector('.show-note-window');
  overlay = document.querySelector('.overlay-show-note');
  btnClose = document.querySelector('.btn-close-show-window');
  titleField = document.querySelector('.note-headline');
  descriptionField = document.querySelector('.note-description');

  constructor() {
    super();
    this._addHandlerCloseWindow();
  }

  setTitle(title) {
    this.titleField.textContent = title;
  }

  setDescription(description) {
    this.descriptionField.textContent = description;
  }

  addHandlerShowNote(handler) {
    this.parentElement.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.mini-btn')) return;
      const note = target.closest('.note');
      if (note) {
        const noteId = note.getAttribute('id');
        handler(noteId);
      }
    });
  }
}

export default new NoteContentView();
