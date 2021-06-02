import * as model from '../js/model.js';
import NotesView from './views/notesView.js';
import AddNoteView from './views/addNoteView.js';
import { addFolderView, foldersView } from './views/foldersView.js';
import NoteContentView from './views/noteContentView.js';
import ToolsBarView from './views/toolsBarView.js';
import DeleteConfirmationView from './views/deleteConfirmationView.js';

const controlAddNote = function () {
  const { activeNote } = model.state;
  const title = AddNoteView.getTitle();
  const description = AddNoteView.getDescription();
  if (!activeNote) {
    const time = new Date().getTime().toString();
    const folder = AddNoteView.getSelectedFolder();
    const createdNote = model.addNote(title, description, time, folder);
    model.addNoteToFolder(createdNote);
  } else {
    model.updateNote(activeNote, title, description);
    model.state.activeNote = null;
    NoteContentView.resetActiveNoteId();
  }
  AddNoteView.clearInputs();
  AddNoteView.toogleWindow();
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(model.state.currentNotesView);
};

const controlDeleteNote = function (id) {
  DeleteConfirmationView.toogleWindow();
  model.state.noteToDelete = id;
};

const controlDeleteConfirmation = function () {
  const { noteToDelete: id } = model.state;
  if (id === model.state.pinNoteID) model.state.pinNoteID = null;
  model.removeNoteFromFolder(id);
  model.deleteNote(id);
  model.state.noteToDelete = null;
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(model.state.currentNotesView);
  DeleteConfirmationView.toogleWindow();
};

const controlDeleteCancel = function () {
  DeleteConfirmationView.toogleWindow();
};

const controlSearchNote = function () {
  const text = ToolsBarView.getText();
  const arrayOfFoundNotes = model.searchNotes(text);
  model.mapSortFunc.get(model.state.currentSorting)();
  if (!text) {
    NotesView.render(model.state.currentNotesView);
  } else {
    NotesView.render(arrayOfFoundNotes);
  }
};

function controlShowNote(activeNoteId) {
  model.state.activeNote = activeNoteId;
  const note = model.findNoteById(activeNoteId);
  NoteContentView.setTitle(note.title);
  NoteContentView.setDescription(note.description);
  NoteContentView.toogleWindow();
}

function controlEditNote(activeNoteId) {
  NoteContentView.toogleWindow();
  AddNoteView.toogleWindow();
  const note = model.findNoteById(activeNoteId);
  AddNoteView.setTitle(note.title);
  AddNoteView.setDescription(note.description);
}

function controlAddFolder() {
  const name = addFolderView.getName();
  if (name) {
    model.addFolder(name);
    foldersView.render(model.state.folders);
    addFolderView.clearInputs();
  }
  AddNoteView.renderFoldersBar(model.state.folders);
  addFolderView.toogleWindow();
}

function controlDeleteFolder(id) {
  model.deleteFolderNotesFromStateArray(id);
  model.deleteFolder(id);
  NotesView.render(model.state.notes);
  foldersView.render(model.state.folders);
  AddNoteView.renderFoldersBar(model.state.folders);
}

function controlFolderInterface(folderId) {
  const folder = model.findFolderById(folderId);
  model.state.activeNotes = folder.notes;
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(model.state.currentNotesView);
}

function controlMainFolderInterface() {
  model.state.activeNotes = model.state.notes;
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(model.state.currentNotesView);
}

NoteContentView.addHandlerEditNote(controlEditNote);
addFolderView.addHandlerAddFolder(controlAddFolder);
model.mapSortFunc.get(model.state.currentSorting)();
AddNoteView.addHandlerAddNote(controlAddNote);
foldersView.addHandlerDeleteFolder(controlDeleteFolder);
NotesView.render(model.state.currentNotesView);
foldersView.render(model.state.folders);
ToolsBarView.addHandlerSearchNote(controlSearchNote);
NoteContentView.addHandlerShowNote(controlShowNote);
DeleteConfirmationView.addHandlerDeleteNote(controlDeleteNote);
DeleteConfirmationView.addHandlerDeleteConfirm(controlDeleteConfirmation);
DeleteConfirmationView.addHandlerDeleteFalse(controlDeleteCancel);
foldersView.addHandlerOpenFolder(controlFolderInterface);
AddNoteView.renderFoldersBar(model.state.folders);
foldersView.addHandlerOpenMainFolder(controlMainFolderInterface);

// sorting
const controlSort = function (keySort) {
  model.mapSortFunc.get(keySort)();
  NotesView.render(model.state.currentNotesView);
};

ToolsBarView.addHandlerSort(controlSort);

// pin
const controlPinNote = function (noteId) {
  model.pinNote(noteId);
  NotesView.render(model.state.currentNotesView);
};

NotesView.addHandlerPinNote(controlPinNote);
