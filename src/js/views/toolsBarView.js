class ToolsBarView {
  textInput = document.querySelector('.input-search-note');
  btnFind = document.querySelector('.search-btn');
  parentElement = document.querySelector('.toolsbar-container');
  btnShowArchive = document.querySelector('.delete-all-btn');
  container = document.querySelector('.notes-container');

  addHandlerSort(handler) {
    this.parentElement.addEventListener('click', (e) => {
      const target = e.target;
      const element = target.closest('.btn-general');
      if (element) {
        const keySort = element.getAttribute('data-key');
        handler(keySort);
        if (element.classList.contains('btn-sort-older-first')) {
          this.changeBtnSortTimeKey(element, keySort);
        }
      }
    });
  }

  changeBtnSortTimeKey(element, keySort) {
    const newKeySort = keySort === 'fe' ? 'fl' : 'fe';
    element.setAttribute('data-key', newKeySort);
  }

  getText() {
    return this.textInput.value;
  }

  addHandlerSearchNote(handler) {
    this.textInput.addEventListener('input', () => {
      handler();
    });
  }

  addHandlerShowArchive(handler) {
    this.btnShowArchive.addEventListener('click', () => {
      const className = this.container.children[0].className;
      const check = className.includes('archived');
      handler(check);
    });
  }
}

export default new ToolsBarView();
