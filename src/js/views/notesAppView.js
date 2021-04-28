class NotesAppView {
    parentElement = document.querySelector('.main-container');

    render(data) {
        console.log(this.parentElement)
        this._clear();
        this.parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup());
    }

    _clear() {
        this.parentElement.innerHTML = '';
    }

    _generateMarkup() {
        return `
        <div class="add-note-input-container">
            <form class="add-note-form" action="#">
                <input class="add-note-input" type="text" placeholder="Додати запис..." />
            </form>
        </div>
        <div class="search-note-input">
            <form action="#" class="search-form">
                <input class="input-search-note" type="text" placeholder="Шукати запис..." />
                <button type="submit" class="search-btn">
                    <i class="fas fa-search"></i>
                </button>
            </form>
        </div>
        <div class="notes-container">
        </div>
        `
    }
}

export default new NotesAppView();