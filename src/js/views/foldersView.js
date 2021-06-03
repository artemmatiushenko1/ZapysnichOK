class FoldersView {
  data;
  parentElement = document.querySelector('.new-folders');
  mainFolder = document.querySelector('.main-folder');
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

  addHandlerOpenFolder(handler) {
    this.parentElement.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('delete-folder-btn')) return;
      const selectedFolder = target.closest('.folder');
      if (selectedFolder) {
        const selectedFolderId = selectedFolder.getAttribute('id');
        handler(selectedFolderId);
      }
    });
  }

  addHandlerOpenMainFolder(handler) {
    this.mainFolder.addEventListener('click', () => handler());
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

export default new FoldersView();
