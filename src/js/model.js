export const state = {
  notes: [],
  notesId: [],
  folders: {
    Важливе: [],
  },
  currentNotesView: [],
  pinNoteID: null,
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
    state.notesId.push(id.toString());
    return id.toString();
  }
}

export const addNote = function(title, description, time, folder) {
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

function copyObject(object) {
  const objCopy = {};
  const keys = Object.keys(object);
  for (const key of keys) {
    objCopy[key] = object[key];
  }
  return objCopy;
}

function copyNotes() {
  const copy = [];
  for (let i = 0; i < state.notes.length; i++) {
    const note = copyObject(state.notes[i]);
    copy.push(note);
  }
  return copy;
}

//Bubble sort
function sortNotes(callback) {
  return function() {
    //get index pinned note by id
    let pinnedNote = 0;
    const sortedNotes = copyNotes();
    if (state.pinNoteID) {
      let indexPinNote = 0;
      while (sortedNotes[indexPinNote].id !== state.pinNoteID) {
        indexPinNote++;
      }
      pinnedNote = sortedNotes.pop(indexPinNote);
    }
    sortedNotes.sort(callback);
    if (state.pinNoteID) {
      sortedNotes.unshift(pinnedNote);
    }
    state.currentNotesView = sortedNotes;

    return sortedNotes;
  };
}

export const deleteNote = function deleteNotes(id) {
  console.log(id);
  const index1 = state.notesId.indexOf(id);
  const index2 = state.notes.findIndex((note) => note.id === id);
  state.notes.splice(index1, 1);
  state.notesId.splice(index2, 1);
  console.log(index1, index2);
  writeToNotesStorage();
};

// partial
function compareStrZA(a, b){
  if (a.title < b.title){
    return 1;
  } else {
    return -1;
  }
}

function compareStrAZ(a, b){
  if (a.title > b.title){
    return 1;
  } else {
    return -1;
  }
}

export const sortFirstLater = sortNotes((a, b) => a.time - b.time);
export const sortFirstEarlier = sortNotes((a, b) => b.time - a.time);
export const sortByAZ = sortNotes(compareStrZA);
export const sortByZA = sortNotes(compareStrAZ);

export const findNoteById = function(id) {
  const searchResult = state.notes.find((note) => note.id === id);

  return searchResult;
};
