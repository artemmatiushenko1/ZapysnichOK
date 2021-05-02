export const state = {
    notes: [],
    notesId: [],
    folders: {
        Важливе: [],
    },
};

const notesStorage = window.localStorage;
function writeToNotesStorage() {
    notesStorage.setItem('notes', JSON.stringify(state.notes));
}
function getNotesFromStorage() {
    if (notesStorage.notes) {
        state.notes = JSON.parse(notesStorage.getItem('notes'));
        pushNotesIdInArray();
    }
}
getNotesFromStorage();

function pushNotesIdInArray() {
    for (const note of state.notes) {
        state.notesId.push(note.id);
    }
}

export class Note {
    constructor(title, description, time, folder) {
        this.title = title;
        this.description = description;
        this.time = time;
        this.folder = folder;
        this.id = this._generateId();
    }

    _generateId() {
        let id = new Date().getTime();
        while (state.notesId.includes(id)) {
            id++;
        }
        state.notesId.push(id);
        return id;
    }
}

export const addNote = function (title, description, time, folder) {
    const newNote = new Note(title, description, time, folder);
    state.notes.unshift(newNote);
    writeToNotesStorage();
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
