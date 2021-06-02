export const state = {
  notes: [],
  notesId: [],
  folders: {},
  foldersId: [],
  activeNotes: [],
  currentNotesView: [],
  currentSorting: 'fe',
  pinNoteID: null,
  noteToDelete: null,
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
    state.activeNotes = writtenNotes;
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
    this.isPinned = false;
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
  state.foldersId.unshift(newFolder.id);
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

export function deleteFolderNotesFromStateArray(folderId) {
  const folder = findFolderById(folderId);
  for (const note of folder.notes) {
    deleteNote(note.id);
  }
}

// SORTING AND PIN
function getIndexPinNote() {
  const pinNote = state.activeNotes.find((note) => note.id === state.pinNoteID);
  const indexPinNote = state.activeNotes.indexOf(pinNote);

  return indexPinNote;
}

// func takes callback and return new function with binded condition for sorting
function sortNotes(callback, key) {
  return function () {
    const sortedNotes = [...state.activeNotes];
    const indexPinNote = getIndexPinNote();
    // indexOf return -1 if no element in array
    if (state.pinNoteID && indexPinNote !== -1) {
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

// return -1 or 1 because its specific work of method .sort()
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

// access to functions will be provided through keys in collection
export const mapSortFunc = new Map();
mapSortFunc
  .set('fl', sortFirstLater)
  .set('fe', sortFirstEarlier)
  .set('az', sortByAZ)
  .set('za', sortByZA);

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
