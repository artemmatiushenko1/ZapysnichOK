class AddFolderView {
    window = document.querySelector('.add-folder-window');
    overlay = document.querySelector('.overlay-folders');
    showWindowBtn = document.querySelector('.btn-add-folder');

    constructor() {
        this._addHandlerShowWindow();
        this._addHandlerCloseWindow();
    }

    toggleWindow() {
        this.window.classList.toggle('hidden');
        this.overlay.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        this.showWindowBtn.addEventListener(
            'click',
            this.toggleWindow.bind(this)
        );
    }

    _addHandlerCloseWindow() {
        this.overlay.addEventListener('click', this.toggleWindow.bind(this));
    }
}

export default new AddFolderView();
