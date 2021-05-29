import Modal from './modal.js';

class AddNoteView extends Modal {
  rootElement = document.querySelector('.main-container');
  parentElement = document.querySelector('.add-note-form');
  window = document.querySelector('.add-note-window');
  overlay = document.querySelector('.overlay-add-note');
  btnOpen = document.querySelector('.add-note-input');
  btnClose = document.querySelector('.btn-close-modal');
  createNoteBtn = document.querySelector('.add-note-btn');
  titleInput = document.querySelector('.note-headline-input');
  descriptionInput = document.querySelector('.note-content-input');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  getTitle() {
    return this.titleInput.value;
  }

  getDescription() {
    return this.descriptionInput.value;
  }

  clearInputs() {
    this.titleInput.value = '';
    this.descriptionInput.value = '';
  }
  
  getSelectedFolder() {
    const result = this.selectedFolder.value;
    return result;
  }

  addHandlerAddNote(handler) {
    this.createNoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    });
  }

  _clear() {
    this.selectedFolder.innerHTML = '';
  }

  renderFoldersBar(data) {
    this.data = data;
    this._clear();
    this.selectedFolder.insertAdjacentHTML(
      'afterbegin',
      this._generateFoldersBarMarkup()
    );
  }

  _generateFoldersBarMarkup() {
    const foldersBarMarkup = Object.keys(this.data).map(
      (folderName) => `
      <option value="${folderName}">${folderName}</option>
      `
    );
    foldersBarMarkup.unshift(
      `
      <option value='Всі записи'>Всі записи</option>
    `
    );
    return foldersBarMarkup.join('');
  }  
}

export default new AddNoteView();
