import Modal from './modal.js';

class AddFolderView extends Modal {
  parentElement = document.querySelector('.new-folders');
  btnOpen = document.querySelector('.btn-add-folder');
  window = document.querySelector('.add-folder-window');
  overlay = document.querySelector('.overlay-folders');
  titleInput = document.querySelector('.folder-name-input');
  btnCreateFolder = document.querySelector('.btn-create-folder');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  getName() {
    return this.titleInput.value;
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
  btnShowFolders = document.querySelector('.navbar-header h2');
  foldersContainer = document.querySelector('.folders-container');
  arrowIcon = document.querySelector('.fa-chevron-down');

  constructor() {
    this.addHandlerAnimateFoldersView();
  }

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

  addHandlerAnimateFoldersView() {
    this.btnShowFolders.addEventListener('click', () => {
      this.foldersContainer.classList.toggle('folders-container-active');
      this.arrowIcon.classList.toggle('fa-chevron-down-active');
    });
  }

  _generateMarkup() {
    return Object.keys(this.data)
      .map(
        (folderName) => `
          <li class="folder" id=${this.data[folderName].id}>
            <a href="#">${folderName}</a>
            <i class="far fa-minus-square delete-folder-btn"></i>
          </li>
          `
      )
      .join('');
  }
}

export const addFolderView = new AddFolderView();
export const foldersView = new FoldersView();
