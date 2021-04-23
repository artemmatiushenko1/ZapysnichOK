const state = {
    notes: [],
    notesId: [],
    folders: {
        'Важливе': [],
    }
}

class Note {
    constructor(title, description, time, folder) {
        this.title = title;
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
    state.notes.push(new Note("Заголовок", "Опис", new Date(), state.folders['Важливе']));
}

console.log(state);