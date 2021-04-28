export const state = {
    notes: [],
    notesId: [],
    folders: {
        Важливе: [],
    },
};

export class Note {
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
    };
}

export const addNote = function (title, description, time, folder) {
    const newNote = new Note(title, description, time, folder);
    state.notes.unshift(newNote);
};

console.log(state);

function normalizationFormat(data) {
    const formatter = new Intl.DateTimeFormat('uk', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    const formattedData = formatter.format(data).replace(',', '');
    return formattedData;
}
