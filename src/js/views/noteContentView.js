class NoteContentView {
  parentElement = document.querySelector('.notes-container');
  window = document.querySelector('.show-note-window');
  overlay = document.querySelector('.overlay-show-note');
  btnClose = document.querySelector('.btn-close-show-window');
  titleField = document.querySelector('.note-headline');
  descriptionField = document.querySelector('.note-description');

  constructor() {
    this._addHandlerCloseWindow();
  }

  setTitle(title) {
    this.titleField.textContent = title;
  }

  setDescription(description) {
    this.descriptionField.textContent = description;
  }

  toogleWindow() {
    this.window.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }

  _addHandlerCloseWindow() {
    this.btnClose.addEventListener('click', this.toogleWindow.bind(this));
    this.overlay.addEventListener('click', this.toogleWindow.bind(this));
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
