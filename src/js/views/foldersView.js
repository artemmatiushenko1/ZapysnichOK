import Modal from './modal.js';

class AddFolderView extends Modal {
  parentElement = document.querySelector('.new-folders');
  btnOpen = document.querySelector('.btn-add-folder');
  window = document.querySelector('.add-folder-window');
  overlay = document.querySelector('.overlay-folders');
  folderNameInput = document.querySelector('.folder-name-input');
  btnCreateFolder = document.querySelector('.btn-create-folder');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  getName() {
    return this.folderNameInput.value;
  }

  clearInputs() {
    this.folderNameInput.value = '';
  }

  addHandlerAddFolder(handler) {
    this.btnCreateFolder.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

class FoldersView {
  data;
  parentElement = document.querySelector('.new-folders');
  createFolderBtn = document.querySelector('.btn-create-folder');
  folderName = document.querySelector('.folder-name-input');

  render(data) {
    this.data = data;
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }

  _clear() {
    this.parentElement.innerHTML = '';
  }

  _generateMarkup() {
    return Object.keys(this.data)
      .map(
        (folderName) => `
          <li class="folder">
            <a href="#">${folderName}</a> 
          </li>
          `
      )
      .join('');
  }
}

export const addFolderView = new AddFolderView();
export const foldersView = new FoldersView();