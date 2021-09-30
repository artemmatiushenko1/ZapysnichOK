class NotesView {
  data;
  parentElement = document.querySelector('.notes-container');
  message = 'There is no notes here yet :)';

  render(data) {
    this.data = data;
    if (!this.data || !Array.isArray(this.data) || this.data.length === 0) {
      this.renderMessage();
      return;
    }
    this._clearParentEl();
    this.parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }

  renderMessage(message = this.message) {
    const messageMarkup = `<p class="message" >${message}</p>`;
    this._clearParentEl();
    this.parentElement.insertAdjacentHTML('afterbegin', messageMarkup);
  }

  _clearParentEl() {
    this.parentElement.innerHTML = '';
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

  addHandlerPinNote(handler) {
    this.parentElement.addEventListener('click', (e) => {
      const target = e.target;
      const btnPinNote = target.closest('.btn-pin-note');
      if (btnPinNote) {
        const note = btnPinNote.closest('.note');
        const noteId = note.getAttribute('id');
        handler(noteId);
      }
    });
  }

  _generateMarkup() {
    return this.data
      .map(
        (note) => `
            <div class="note 
                ${note.isArchived ? 'archived' : ''}" id=${note.id}>
                <div class="note-content">
                    <h2 class="note-headline">${note.title}</h2>
                    <p>${note.description}</p>
                    <button class="btn-general mini-btn btn-pin-note 
                    ${note.isPinned ? 'active-pin' : 'pin'}">
                        <i class="fas fa-thumbtack"></i>
                    </button>
                </div>
                <div class="action-btns-container">
                    <div class="note-group">${note.folder}</div>
                    <ul class="btns-container">
                        <p class="note-time">
                        ${this._formatDate(new Date(+note.time))}
                        </p>
                        <li class="note-action-btn">
                          <button class="btn-general mini-btn btn-delete-note">
                              <i class="fas fa-trash-alt"></i>
                          </button>
                        </li>
                    </ul>
                </div>
            </div>
            `
      )
      .join('');
  }
}

export default new NotesView();
