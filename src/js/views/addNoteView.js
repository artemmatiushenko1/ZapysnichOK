import Modal from './modal.js';

class AddNoteView extends Modal {
  parentElement = document.querySelector('.add-note-form');
  window = document.querySelector('.add-note-window');
  overlay = document.querySelector('.overlay-add-note');
  btnOpen = document.querySelector('.add-note-input');
  btnClose = document.querySelector('.btn-close-modal');
  createNoteBtn = document.querySelector('.add-note-btn');
  titleInput = document.querySelector('.note-headline-input');
  descriptionInput = document.querySelector('.note-content-input');
  selectedFolder = document.querySelector('#folder-select');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  setTitle(title) {
    this.titleInput.value = title;
  }

  setDescription(description) {
    this.descriptionInput.value = description;
  }

  addHandlerAddNote(handler) {
    this.createNoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = this.getValue(this.titleInput);
      const description = this.getValue(this.descriptionInput);
      const folder = this.getValue(this.selectedFolder);
      handler(title, description, folder);
    });
  }

  renderFoldersBar(data) {
    this.data = data;
    this.selectedFolder.innerHTML = '';
    this.selectedFolder.insertAdjacentHTML(
      'afterbegin',
      this._generateFoldersBarMarkup()
    );
  }

  _generateFoldersBarMarkup() {
    const foldersBarMarkup = Object.keys(this.data).map(
      (folderName) => `<option value="${folderName}">${folderName}</option>`
    );
    foldersBarMarkup.unshift('<option value="Всі записи">Всі записи</option>');
    return foldersBarMarkup.join('');
  }
}

export default new AddNoteView();
