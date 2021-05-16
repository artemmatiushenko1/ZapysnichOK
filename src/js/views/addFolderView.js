class AddFolderView {
  parentElement = document.querySelector('.new-folders');
  btnShowAddFolderWindow = document.querySelector('.btn-add-folder');
  window = document.querySelector('.add-folder-window');
  overlay = document.querySelector('.overlay-folders');
  folderNameInput = document.querySelector('.folder-name-input');
  btnCreateFolder = document.querySelector('.btn-create-folder');

  constructor() {
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  getName() {
    return this.folderNameInput.value;
  }

  clearInputs() {
    this.folderNameInput.value = '';
  }

  _addHandlerShowWindow() {
    this.btnShowAddFolderWindow.addEventListener(
      'click',
      this.toggleWindow.bind(this)
    );
  }

  _addHandlerCloseWindow() {
    this.overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  toggleWindow() {
    this.window.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }

  addHandlerAddFolder(handler) {
    this.btnCreateFolder.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new AddFolderView();
