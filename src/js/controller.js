import * as model from '../js/model.js';
import NotesView from './views/notesView.js';
import AddNoteView from './views/addNoteView.js';
import FoldersView from './views/foldersView.js';
import AddFolderView from './views/addFolderView.js';
import NoteContentView from './views/noteContentView.js';
import ToolsBarView from './views/toolsBarView.js';
import DeleteConfirmationView from './views/deleteConfirmationView.js';

const renderNotesView = function () {
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(model.state.currentNotesView);
};

const controlAddNote = function (title, description, folder) {
  const { activeNote } = model.state;
  if (!activeNote) {
    const time = new Date().getTime().toString();
    model.addNote(title, description, time, folder);
  } else {
    model.updateNote(activeNote, title, description);
    model.state.activeNote = null;
    NoteContentView.resetActiveNoteId();
  }
  AddNoteView.clearInputs();
  AddNoteView.toogleWindow();
  renderNotesView();
};

const controlDeleteNote = function (id) {
  DeleteConfirmationView.toogleWindow();
  model.state.noteToDelete = id;
};

const controlDeleteConfirmation = function () {
  const { noteToDelete: id } = model.state;
  if (id === model.state.pinNoteID) model.state.pinNoteID = null;
  const check = model.state.notesId.includes(id);
  if (check) model.removeNoteFromFolder(id);
  model.deleteNote(id);
  model.state.noteToDelete = null;
  model.mapSortFunc.get(model.state.currentSorting)();
  if (check) {
    NotesView.render(model.state.currentNotesView);
  } else {
    NotesView.render(model.state.archive);
  }
  DeleteConfirmationView.toogleWindow();
};

const controlShowArchive = function (check) {
  const corection = model.state.archive.length;
  if (check || !corection) {
    NotesView.render(model.state.currentNotesView);
  } else {
    NotesView.render(model.state.archive);
  }
};

const controlDeleteCancel = function () {
  DeleteConfirmationView.toogleWindow();
  model.state.noteToDelete = null;
};

const controlSearchNote = function () {
  const text = ToolsBarView.getText();
  const arrayOfFoundNotes = model.searchNotes(text);
  model.mapSortFunc.get(model.state.currentSorting)();
  if (text) {
    NotesView.render(arrayOfFoundNotes);
  } else {
    NotesView.render(model.state.currentNotesView);
  }
};

const controlShowNote = function (activeNoteId) {
  model.state.activeNote = activeNoteId;
  const note = model.findNoteById(activeNoteId);
  NoteContentView.setTitle(note.title);
  NoteContentView.setDescription(note.description);
  NoteContentView.toogleWindow();
};

const controlEditNote = function (activeNoteId) {
  NoteContentView.toogleWindow();
  AddNoteView.toogleWindow();
  const note = model.findNoteById(activeNoteId);
  AddNoteView.setTitle(note.title);
  AddNoteView.setDescription(note.description);
};

const controlAddFolder = function (name) {
  if (name) {
    model.addFolder(name);
    FoldersView.render(model.state.folders);
    AddFolderView.clearInputs();
    AddNoteView.renderFoldersBar(model.state.folders);
  }
  AddFolderView.toogleWindow();
};

const controlDeleteFolder = function (id) {
  model.deleteFolder(id);
  NotesView.render(model.state.notes);
  FoldersView.render(model.state.folders);
  AddNoteView.renderFoldersBar(model.state.folders);
};

const controlFolderInterface = function (folderId = model.mainFolderName) {
  const folder =
    folderId === model.mainFolderName ?
      model.state :
      model.findFolderById(folderId);
  model.state.activeNotes = folder.notes;
  renderNotesView();
};

// sorting
const controlSort = function (keySort) {
  model.mapSortFunc.get(keySort)();
  NotesView.render(model.state.currentNotesView);
};

// pin
const controlPinNote = function (noteId) {
  model.pinNote(noteId);
  NotesView.render(model.state.currentNotesView);
};

// Render a previously saved data when the app starts
renderNotesView();
FoldersView.render(model.state.folders);
AddNoteView.renderFoldersBar(model.state.folders);

// Subscribing for the future events
ToolsBarView.addHandlerSort(controlSort);
NotesView.addHandlerPinNote(controlPinNote);
NoteContentView.addHandlerEditNote(controlEditNote);
AddFolderView.addHandlerAddFolder(controlAddFolder);
AddNoteView.addHandlerAddNote(controlAddNote);
FoldersView.addHandlerDeleteFolder(controlDeleteFolder);
ToolsBarView.addHandlerSearchNote(controlSearchNote);
NoteContentView.addHandlerShowNote(controlShowNote);
DeleteConfirmationView.addHandlerDeleteNote(controlDeleteNote);
DeleteConfirmationView.addHandlerDeleteConfirm(controlDeleteConfirmation);
DeleteConfirmationView.addHandlerDeleteFalse(controlDeleteCancel);
FoldersView.addHandlerOpenFolder(controlFolderInterface);
FoldersView.addHandlerOpenMainFolder(controlFolderInterface);
ToolsBarView.addHandlerShowArchive(controlShowArchive);
