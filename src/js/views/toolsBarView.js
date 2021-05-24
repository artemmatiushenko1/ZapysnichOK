class ToolsBarView {
    parentElement = document.querySelector('.toolsbar-container');

    addHandlerSort(handler) {
      this.parentElement.addEventListener('click', (e) => {
        const target = e.target;
        const btnSortByTime = target.closest('.btn-sort-older-first');
        const btnSortByAbc = target.closest('.btn-sort-a-to-z');
        const btnSortByCba = target.closest('.btn-sort-z-to-a');
        if (btnSortByTime || btnSortByAbc || btnSortByCba) {
          let keySort;
          if(btnSortByAbc) keySort = "az";
          if(btnSortByCba) keySort = "za";
          if(btnSortByTime) keySort = "fe";
          //if(btnSortByTime && ) keySort = "fl";

          handler(keySort);
        }
      });
    }
}

export default new ToolsBarView();