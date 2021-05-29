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

  addHandlerDeleteFolder(handler) {
    this.parentElement.addEventListener('click', (e) => {
      const target = e.target;
      const btnDelete = target.closest('.delete-folder-btn');
      if (btnDelete) {
        const folder = btnDelete.closest('.folder');
        const folderId = folder.getAttribute('id');
        handler(folderId);
      }
    });
  }

  _generateMarkup() {
    return Object.keys(this.data)
      .map(
        (folder) => `
          <li class="folder" id=${this.data[folder].id}>
            <a href="#">${this.data[folder].name}</a>
            <i class="far fa-minus-square delete-folder-btn"></i>
          </li>
          `
      )
      .join('');
  }
}

export const addFolderView = new AddFolderView();
export const foldersView = new FoldersView();
