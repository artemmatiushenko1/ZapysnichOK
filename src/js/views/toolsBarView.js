class ToolsBarView {
  textInput = document.querySelector('.input-search-note');
  btnFind = document.querySelector('.search-btn');
  parentElement = document.querySelector('.toolsbar-container');

  addHandlerSort(handler) {
    this.parentElement.addEventListener('click', (e) => {
      const target = e.target;
      const element = target.closest('.btn-general');
      const keySort = element.getAttribute('data-key');
      if (keySort) {
        handler(keySort);
        if (element.classList.contains('btn-sort-older-first')) {
          this.changeBtnSortTimeKey(element, keySort);
        }
      }
    });
  }

  changeBtnSortTimeKey(element, keySort) {
    if (keySort === 'fe') {
      element.setAttribute('data-key', 'fl');
    } else {
      element.setAttribute('data-key', 'fe');
    }
  }
  
  getText() {
    return this.textInput.value;
  }

  addHandlerSearchNote(handler) {
    this.textInput.addEventListener('input', (e) => {
      handler();
    });
  }
}

export default new ToolsBarView();
