class ToolsBarView {
    btnSortByTime = document.querySelector('.btn-sort-older-first');
    btnSortByAbc = document.querySelector('.btn-sort-a-to-z');
    btnSortByCba = document.querySelector('.btn-sort-z-to-a');

    addHandlerSort(handler1, handler2, handler3) {
      this.btnSortByAbc.addEventListener('click', () => {
        handler1();
      });

      this.btnSortByCba.addEventListener('click', () => {
        handler2();
      });

      this.btnSortByTime.addEventListener('click', () => {
        handler3();
      });
    }
}

export default new ToolsBarView();
