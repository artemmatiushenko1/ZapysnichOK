class AddNoteView {
  rootElement = document.querySelector('.main-container');
  parentElement = document.querySelector('.add-note-form');
  window = document.querySelector('.add-note-window');
  overlay = document.querySelector('.overlay');
  btnOpen = document.querySelector('.add-note-input');
  btnClose = document.querySelector('.btn-close-modal');
  createNoteBtn = document.querySelector('.add-note-btn');
  titleInput = document.querySelector('.note-headline-input');
  descriptionInput = document.querySelector('.note-content-input');

  constructor() {
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  getTitle() {
    return this.titleInput.value;
  }

  getDescription() {
    return this.descriptionInput.value;
  }

  toogleWindow() {
    this.window.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
    this.btnOpen.blur();
  }

  _addHandlerShowWindow() {
    this.btnOpen.addEventListener('focus', this.toogleWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    this.btnClose.addEventListener('click', this.toogleWindow.bind(this));
  }

  clearInputs() {
    this.titleInput.value = '';
    this.descriptionInput.value = '';
  }

  addHandlerAddNote(handler) {
    this.createNoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new AddNoteView();
