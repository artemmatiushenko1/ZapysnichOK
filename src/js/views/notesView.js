class NotesView {
    data;
    parentElement = document.querySelector('.notes-container');
    //rootElement = document.querySelector('.main-container');
    message = 'There is no notes here yet :)';

    render(data) {
        //this.parentElement = this.rootElement.querySelector('.notes-container');
        this.data = data;
        if (!this.data || !Array.isArray(this.data) || this.data.length === 0) {
            this.renderMessage();
            return;
        }
        this._clear();
        this.parentElement.insertAdjacentHTML(
            'afterbegin',
            this._generateMarkup()
        );
    }

    renderMessage(message = this.message) {
        const messageMarkup = `<p>${message}</p>`;
        this._clear();
        this.parentElement.insertAdjacentHTML('afterbegin', messageMarkup);
    }

    _clear() {
        this.parentElement.innerHTML = '';
    }

    addHandlerShowNote(handler) {
        this.parentElement.addEventListener('click', function (e) {
            const note = e.target.closest('.note');
            if (note) {
                const noteId = note.getAttribute('id');
                handler(noteId);
            }
        });
    }

    _formatDate(date) {
        if (!date) return;
        const formatter = new Intl.DateTimeFormat('uk', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
        const formattedDate = formatter.format(date).replace(',', '');
        return formattedDate;
    }

    _generateMarkup() {
        return this.data
            .map((note) => {
                return `
            <div class="note" id=${note.id}>
                <div class="note-content">
                    <h2 class="note-headline">${note.title}</h2>
                    <p>
                    ${note.description}
                    </p>
                </div>
                <div class="action-btns-container">
                    <div class="note-group">${note.folder}</div>
                    <ul class="btns-container">
                        <p class="note-time">${this._formatDate(
                            new Date(note.time)
                        )}</p>
                        <li class="note-action-btn">
                            <button class="btn-general btn-delete-note">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            `;
            })
            .join('');
    }
}

export default new NotesView();
