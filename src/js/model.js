export const state = {
  notes: [],
  notesId: [],
  folders: {},
  foldersId: [],
  currentNotesView: [],
  archive: [],
  currentSorting: 'fe',
  pinNoteID: null,
};

const storage = window.localStorage;

function writeToStorage() {
  storage.setItem('notes', JSON.stringify(state.notes));
  storage.setItem('folders', JSON.stringify(state.folders));
  storage.setItem('archive', JSON.stringify(state.archive));
}

function getDataFromStorage() {
  const writtenNotes = JSON.parse(storage.getItem('notes'));
  const writtenFolders = JSON.parse(storage.getItem('folders'));
  const writtenArchive = JSON.parse(storage.getItem('archive'));
  if (writtenNotes) {
    state.notes = writtenNotes;
    pushNotesIdInArray();
  }
  if (writtenFolders) state.folders = writtenFolders;
  if (writtenArchive) state.archive = writtenArchive;
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
  idStorage.push(id.toString());
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

export function addNote(title, description, time, folder) {
  const newNote = new Note(title, description, time, folder);
  state.notes.unshift(newNote);
  writeToStorage();
}

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

// sort with pin
function sortNotes(callback, key) {
  return function () {
    const sortedNotes = [...state.notes];
    if (state.pinNoteID) {
      const indexPinNote = state.notesId.indexOf(state.pinNoteID);
      const pinnedNote = sortedNotes.splice(indexPinNote, 1);
      sortedNotes.sort(callback);
      sortedNotes.unshift(pinnedNote[0]);
    } else {
      sortedNotes.sort(callback);
    }
    state.currentNotesView = sortedNotes;
    state.currentSorting = key;
  };
}

function compareStrZA(a, b) {
  return a.title < b.title ? 1 : -1;
}

function compareStrAZ(a, b) {
  return a.title > b.title ? 1 : -1;
}

export const sortFirstLater = sortNotes((a, b) => a.time - b.time, 'fl');
export const sortFirstEarlier = sortNotes((a, b) => b.time - a.time, 'fe');
export const sortByAZ = sortNotes(compareStrAZ, 'az');
export const sortByZA = sortNotes(compareStrZA, 'za');

export const mapSortFunc = new Map();
mapSortFunc
  .set('fl', sortFirstLater)
  .set('fe', sortFirstEarlier)
  .set('az', sortByAZ)
  .set('za', sortByZA);
// end sort

export function deleteNote(id) {
  const check = state.notesId.includes(id);
    if (check) {
      const index = state.notesId.indexOf(id);
      const index2 = state.notes.findIndex((element) => element.id === id);
      state.archive.unshift(state.notes[index2]);
      state.notesId.splice(index, 1);
      state.notes.splice(index2, 1);
    } else {
      const index3 = state.archive.findIndex((element) => element.id === id);
      state.archive.splice(index3, 1);
    }
    writeToStorage();
    return check;
}

export const findNoteById = function (id) {
  const searchResult = state.notes.find((note) => note.id === id);
  return searchResult;
};
