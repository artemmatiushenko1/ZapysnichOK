export const state = {
  notes: [],
  notesId: [],
  folders: {},
  foldersId: [],
  currentNotesView: [],
  currentSorting: 'fe',
  pinNoteID: null,
};

const storage = window.localStorage;

function writeToStorage() {
  storage.setItem('notes', JSON.stringify(state.notes));
  storage.setItem('folders', JSON.stringify(state.folders));
  storage.setItem('pinId', JSON.stringify(state.pinNoteID));
}

function getDataFromStorage() {
  const writtenNotes = JSON.parse(storage.getItem('notes'));
  const writtenFolders = JSON.parse(storage.getItem('folders'));
  const writtenPinId = JSON.parse(storage.getItem('pinId'));
  if (writtenNotes) {
    state.notes = writtenNotes;
    pushNotesIdInArray();
  }
  if (writtenFolders) state.folders = writtenFolders;
  if (writtenPinId) state.pinNoteID = writtenPinId;
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
  idStorage.unshift(id.toString());
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
  return newNote;
}

export function findNoteById(id) {
  const searchResult = state.notes.find((note) => note.id === id);
  return searchResult;
}

export class Folder {
  constructor(name) {
    this.name = name;
    this.id = generateId(state.foldersId);
    this.notes = [];
  }

  attachNoteToFolder(note) {
    this.notes.unshift(note);
  }
}

export function addFolder(name) {
  const newFolder = new Folder(name);
  state.folders[newFolder.name] = newFolder;
  writeToStorage();
}

export function addNoteToFolder(note) {
  const selectedFolderName = note.folder;
  if (selectedFolderName === 'Всі записи') return;
  const selectedFolder = state.folders[selectedFolderName];
  selectedFolder.notes.unshift(note);
  writeToStorage();
}

export function findFolderById(id) {
  const folderNames = Object.keys(state.folders);
  for (const folder of folderNames) {
    if (String(state.folders[folder].id) === id) {
      return state.folders[folder];
    }
  }
}

export function removeNoteFromFolder(noteId) {
  const note = findNoteById(noteId);
  const folderName = note.folder;
  const folder = state.folders[folderName];
  if (folderName !== 'Всі записи') {
    const noteIndex = findIndexNoteInFolder(noteId, folder);
    folder.notes.splice(noteIndex, 1);
  }
}

function findIndexNoteInFolder(noteId, folder) {
  for (const note of folder.notes) {
    if (note.id === noteId) return folder.notes.indexOf(note);
  }
}

// sort with pin
function sortNotes(callback, key) {
  return function() {
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
  return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
}

function compareStrAZ(a, b) {
  return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
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
// pin
export function pinNote(noteId) {
  if (state.pinNoteID) {
    const currentPinnedNote = findNoteById(state.pinNoteID);
    currentPinnedNote.isPinned = false;
  }
  if (state.pinNoteID === noteId) {
    state.pinNoteID = null;
  } else {
    state.pinNoteID = noteId;
    const newPinnedNote = findNoteById(noteId);
    newPinnedNote.isPinned = true;
  }
  mapSortFunc.get(state.currentSorting)();
  writeToStorage();
}

export function deleteNote(id) {
  removeNoteFromFolder(id);
  const index = state.notesId.indexOf(id);
  const index2 = state.notes.findIndex((element) => element.id === id);
  state.notesId.splice(index, 1);
  state.notes.splice(index2, 1);
  writeToStorage();
}

export function deleteFolder(id) {
  const folder = findFolderById(id);
  delete state.folders[folder.name];
  const index = state.foldersId.indexOf(id);
  state.foldersId.splice(index, 1);
  writeToStorage();
}

export function searchNotes(value) {
  const arrayOfFoundNotes = [];
  for (const elem of state.notes) {
    if (elem.title.includes(value) || elem.description.includes(value)) {
      arrayOfFoundNotes.push(elem);
    }
  }
  return arrayOfFoundNotes;
}
