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

  addHandlerAddFolder(handler) {
    this.btnCreateFolder.addEventListener('click', (e) => {
      e.preventDefault();
      const folderName = this.getValue(this.titleInput);
      handler(folderName);
    });
  }
}

export default new AddFolderView();
