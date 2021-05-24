class ToolsBarView {
    btnSortByTime = document.querySelector('.btn-sort-older-first');
    btnSortByAbc = document.querySelector('.btn-sort-a-to-z');
    btnSortByCba = document.querySelector('.btn-sort-z-to-a');
    textInput = document.querySelector('.input-search-note');
    btnFind = document.querySelector('.search-btn');

    addHandlerSortByAbc(handler) {
        this.btnSortByAbc.addEventListener('click', (e) => {
            handler();
        });
    }

    addHandlerSortByCba(handler) {
        this.btnSortByCba.addEventListener('click', (e) => {
            handler();
        });
    }

    addHandlerSortByTime(handler) {
        this.btnSortByTime.addEventListener('click', (e) => {
            handler();
        });
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
