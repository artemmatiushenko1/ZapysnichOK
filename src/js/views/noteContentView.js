import Modal from './modal.js';

class NoteContentView extends Modal {
  parentElement = document.querySelector('.notes-container');
  window = document.querySelector('.show-note-window');
  overlay = document.querySelector('.overlay-show-note');
  btnClose = document.querySelector('.btn-close-show-window');
  titleField = document.querySelector('.note-headline');
  descriptionField = document.querySelector('.note-description');
  btnEdit = document.querySelector('.btn-edit');
  activeNoteId = null;

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

  resetActiveNoteId() {
    this.activeNoteId = null;
  }

  addHandlerEditNote(handler) {
    this.btnEdit.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.activeNoteId) {
        handler(this.activeNoteId);
      }
    });
  }

  addHandlerShowNote(handler) {
    this.parentElement.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('.mini-btn')) return;
      const note = target.closest('.note');
      if (note) {
        const noteId = note.getAttribute('id');
        this.activeNoteId = noteId;
        console.log(this.activeNoteId);
        handler(this.activeNoteId);
      }
    });
  }
}

export default new NoteContentView();
