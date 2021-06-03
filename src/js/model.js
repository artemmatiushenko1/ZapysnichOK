const state = {
  notes: [],
  notesId: [],
  folders: {},
  foldersId: [],
  activeNotes: [],
  currentNotesView: [],
  archive: [],
  currentSorting: 'fe',
  pinNoteID: null,
  activeNote: null,
  noteToDelete: null,
};

const mainFolderName = 'Всі записи';

const storage = window.localStorage;
const places = ['notes', 'folders', 'pinNoteID', 'archive'];

function writeToStorage() {
  for (const place of places) {
    const target = JSON.stringify(state[place]);
    storage.setItem(place, target);
  }
}

(function getDataFromStorage() {
  for (const place of places) {
    const item = storage.getItem(place);
    const parsedItem = JSON.parse(item);
    if (parsedItem) state[place] = parsedItem;
  }
  state.activeNotes = state.notes;
  pushNotesIdInArray();
})();

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

class Note {
  constructor(title, description, time, folder) {
    this.title = title;
    this.description = description;
    this.time = time;
    this.folder = folder;
    this.id = generateId(state.notesId);
    this.isPinned = false;
    this.isArchived = false;
  }
}

function addNote(title, description, time, folder) {
  const newNote = new Note(title, description, time, folder);
  state.notes.unshift(newNote);
  addNoteToFolder(newNote);
  writeToStorage();
}

function updateNote(id, title, description) {
  const noteToEdit = findNoteById(id);
  const noteFolderName = noteToEdit.folder;
  if (noteFolderName !== mainFolderName) {
    const noteFolderObject = state.folders[noteFolderName];
    const noteIndexInFolder = findNoteIndexInFolder(id, noteFolderObject);
    const noteInFolder = noteFolderObject.notes[noteIndexInFolder];
    noteInFolder.title = title;
    noteInFolder.description = description;
  }
  noteToEdit.title = title;
  noteToEdit.description = description;
  writeToStorage();
}

console.log(state);
function findNoteById(id) {
  const searchResult = state.notes.find((note) => note.id === id);
  return searchResult;
}

class Folder {
  constructor(name) {
    this.name = name;
    this.id = generateId(state.foldersId);
    this.notes = [];
  }
}

function addFolder(name) {
  const newFolder = new Folder(name);
  state.foldersId.unshift(newFolder.id);
  state.folders[newFolder.name] = newFolder;
  writeToStorage();
}

function addNoteToFolder(note) {
  const selectedFolderName = note.folder;
  if (selectedFolderName === mainFolderName) return;
  const selectedFolder = state.folders[selectedFolderName];
  selectedFolder.notes.unshift(note);
  writeToStorage();
}

function findFolderById(id) {
  const foldersNames = Object.keys(state.folders);
  const foundFolder = foldersNames.find(
    (folder) => state.folders[folder].id === id
  );
  return state.folders[foundFolder];
}

function removeNoteFromFolder(noteId) {
  const note = findNoteById(noteId);
  const folderName = note.folder;
  const folder = state.folders[folderName];
  if (folderName !== mainFolderName) {
    const noteIndex = findNoteIndexInFolder(noteId, folder);
    folder.notes.splice(noteIndex, 1); //remove one element from the array
  }
}

function findNoteIndexInFolder(noteId, folder) {
  const foundNote = folder.notes.find((note) => note.id === noteId);
  return folder.notes.indexOf(foundNote);
}

function deleteFolderNotesFromState(folderId) {
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

const sortFirstLater = sortNotes((a, b) => a.time - b.time, 'fl');
const sortFirstEarlier = sortNotes((a, b) => b.time - a.time, 'fe');
const sortByAZ = sortNotes(compareStrAZ, 'az');
const sortByZA = sortNotes(compareStrZA, 'za');

// access to functions will be provided through keys in collection
const mapSortFunc = new Map();
mapSortFunc
  .set('fl', sortFirstLater)
  .set('fe', sortFirstEarlier)
  .set('az', sortByAZ)
  .set('za', sortByZA);

function pinNote(noteId) {
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

function deleteNote(id) {
  const check = state.notesId.includes(id);
  let index, index2;
  if (check) {
    index = state.notesId.indexOf(id);
    index2 = state.notes.findIndex((element) => element.id === id);
    state.notes[index2].isArchived = true;
    state.archive.unshift(state.notes[index2]);
    state.notesId.splice(index, 1);
    state.notes.splice(index2, 1);
  } else {
    index2 = state.archive.findIndex((element) => element.id === id);
    state.archive.splice(index2, 1);
  }
  writeToStorage();
  return check;
}

function deleteFolder(id) {
  const folder = findFolderById(id);
  deleteFolderNotesFromState(id);
  delete state.folders[folder.name];
  const folderIndex = state.foldersId.indexOf(id);
  state.foldersId.splice(folderIndex, 1); //remove one element from the array
  writeToStorage();
}

function searchNotes(value) {
  const arrayOfFoundNotes = [];
  for (const elem of state.notes) {
    const title = elem.title.toLowerCase();
    const desc = elem.description.toLowerCase();
    const keyword = value.toLowerCase();
    if (title.includes(keyword) || desc.includes(keyword)) {
      arrayOfFoundNotes.push(elem);
    }
  }
  return arrayOfFoundNotes;
}

export {
  state, mapSortFunc, mainFolderName, addNote, addFolder, findNoteById, findFolderById,
  pinNote, searchNotes, deleteNote, deleteFolder, updateNote, removeNoteFromFolder, 
  deleteFolderNotesFromState
};