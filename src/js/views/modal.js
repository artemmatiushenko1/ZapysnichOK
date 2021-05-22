export default class Modal {
  toogleWindow() {
    this.window.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
    if (this.btnOpen) {
      this.btnOpen.blur();
    }
  }

  _addHandlerCloseWindow() {
    if (this.btnClose) {
      this.btnClose.addEventListener('click', this.toogleWindow.bind(this));
    }
    this.overlay.addEventListener('click', this.toogleWindow.bind(this));
  }

  _addHandlerShowWindow() {
    this.btnOpen.addEventListener('focus', this.toogleWindow.bind(this));
  }
}
