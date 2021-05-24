export const state = {
  notes: [],
  notesId: [],
  folders: {},
  foldersId: [],
  currentNotesView: [],
  pinNoteID: null,
};

const storage = window.localStorage;

function writeToStorage() {
  storage.setItem('notes', JSON.stringify(state.notes));
  storage.setItem('folders', JSON.stringify(state.folders));
}

function getDataFromStorage() {
  const writtenNotes = JSON.parse(storage.getItem('notes'));
  const writtenFolders = JSON.parse(storage.getItem('folders'));
  if (writtenNotes) {
    state.notes = writtenNotes;
    pushNotesIdInArray();
  }
  if (writtenFolders) state.folders = writtenFolders;
}

getDataFromStorage();

function pushNotesIdInArray() {
  for (const note of state.notes) {
    state.notesId.push(note.id);
  }
}

function generateId(idStorage) {
  let id = new Date().getTime();
  while (idStorage.includes(id)) {
    id++;
  }
  idStorage.push(id);
  return id.toString();
}

export class Note {
  constructor(title, description, time, folder) {
    this.title = title;
    this.description = description;
    this.time = time;
    this.folder = folder;
    this.id = generateId(state.notesId);
  }
}

export const addNote = function(title, description, time, folder) {
  const newNote = new Note(title, description, time, folder);
  state.notes.unshift(newNote);
  writeToStorage();
};

console.log(state);

export class Folder {
  constructor(name) {
    this.name = name;
    this.id = generateId(state.foldersId);
    this.notes = [];
  }

  addNoteToFolder(note) {
    this.notes.unshift(note);
  }
}

export function addFolder(name, id) {
  const newFolder = new Folder(name, id);
  state.folders[newFolder.name] = newFolder;
  writeToStorage();
}

function getIndexPinNote(sortedNotes) {
  let indexPinNote = 0;
  if (state.pinNoteID) {
    while (sortedNotes[indexPinNote].id !== state.pinNoteID) {
      indexPinNote++;
    }
  }

  return indexPinNote;
}

function sortNotes(callback) {
  return function() {
    const sortedNotes = [...state.notes];
    if (state.pinNoteID) {
      const indexPinNote = getIndexPinNote(sortedNotes);
      const pinnedNote = sortedNotes.pop(indexPinNote);
      sortedNotes.sort(callback);
      sortedNotes.unshift(pinnedNote);
    } else {
      sortedNotes.sort(callback);
    }
    state.currentNotesView = sortedNotes;

    return sortedNotes;
  };
}

// partial
function compareStrZA(a, b) {
  if (a.title > b.title) {
    return 1;
  } else {
    return -1;
  }
}

function compareStrAZ(a, b) {
  if (a.title < b.title) {
    return 1;
  } else {
    return -1;
  }
}

export const sortFirstLater = sortNotes((a, b) => a.time - b.time);
export const sortFirstEarlier = sortNotes((a, b) => b.time - a.time);
export const sortByAZ = sortNotes(compareStrZA);
export const sortByZA = sortNotes(compareStrAZ);

export const deleteNote = function deleteNotes(id) {
  const index = state.notesId.indexOf(id);
  const index2 = state.notes.findIndex((element) => element.id === id);
  state.notesId.splice(index, 1);
  state.notes.splice(index2, 1);
  writeToStorage();
};

export const findNoteById = function(id) {
  const searchResult = state.notes.find((note) => note.id === id);
  return searchResult;
};
