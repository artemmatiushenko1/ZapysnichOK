class ToolsBarView {
  parentElement = document.querySelector('.toolsbar-container');
  btnShowArchive = document.querySelector('.delete-all-btn');
  container = document.querySelector('.notes-container');

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

  addHandlerShowArchive(handler) {
    this.btnShowArchive.addEventListener('click', () => {
      let keyShow = this.btnShowArchive.getAttribute('archive-show');
      handler(keyShow);
      if (keyShow === 'no') {
        this.btnShowArchive.setAttribute('archive-show', 'yes');
      } else {
        this.btnShowArchive.setAttribute('archive-show', 'no');
        for (let elem of this.container.children){
          elem.classList.add('note-in-archive');
        }
      }
    });
  }
}

export default new ToolsBarView();
