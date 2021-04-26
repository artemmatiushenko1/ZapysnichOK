export const state = {
    notes: [],
    notesId: [],
    folders: {
        'Важливе': [],
    }
}

class Note {
    constructor(headline, description, time, folder) {
        this.headline = headline;
        this.description = description;
        this.time = time;
        this.folder = folder;
        this.id = this._generateId();
    }

    _generateId = function () {
        let id = new Date().getTime();
        while (state.notesId.includes(id)) {
            id++;
        }
        state.notesId.push(id);
        return id;
    }
}

for (let i = 0; i < 10; i++) {
    state.notes.push(new Note("Заголовок", "Опис", new Date(), 'Важливе'));
}

console.log(state);