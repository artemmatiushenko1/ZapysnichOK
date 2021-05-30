import * as model from '../js/model.js';
import NotesView from './views/notesView.js';
import AddNoteView from './views/addNoteView.js';
import { addFolderView, foldersView } from './views/foldersView.js';
import NoteContentView from './views/noteContentView.js';
import ToolsBarView from './views/toolsBarView.js';
import DeleteConfirmationView from './views/deleteConfirmationView.js';

const controlAddNote = function() {
  const title = AddNoteView.getTitle();
  const description = AddNoteView.getDescription();
  const time = new Date().getTime().toString();
  const folder = AddNoteView.getSelectedFolder();
  const createdNote = model.addNote(title, description, time, folder);
  AddNoteView.clearInputs();
  model.addNoteToFolder(createdNote);
  AddNoteView.toogleWindow();
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(model.state.currentNotesView);
};

const controlDeleteNote = function(id) {
  DeleteConfirmationView.toogleWindow();
  model.state.noteToDelete = id;
};

const controlDeleteConfirmation = function() {
  DeleteConfirmationView.toogleWindow();
  const id = model.state.noteToDelete;
  if (id === model.state.pinNoteID) model.state.pinNoteID = null;
  model.removeNoteFromFolder(id);
  model.deleteNote(id);
  model.state.noteToDelete = null;
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(model.state.currentNotesView);
}

const controlDeleteCancel = function() {
  DeleteConfirmationView.toogleWindow();
}

const controlSearchNote = function() {
  const text = ToolsBarView.getText();
  const arrayOfFoundNotes = model.searchNotes(text);
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(arrayOfFoundNotes);
};

const controlShowNote = function(id) {
  const note = model.findNoteById(id);
  NoteContentView.setTitle(note.title);
  NoteContentView.setDescription(note.description);
  NoteContentView.toogleWindow();
};

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
  NotesView.render(folder.notes);
}

function controlMainFolderInterface() {
  NotesView.render(model.state.notes);
}

addFolderView.addHandlerAddFolder(controlAddFolder);
model.mapSortFunc.get(model.state.currentSorting)();
AddNoteView.addHandlerAddNote(controlAddNote);
foldersView.addHandlerDeleteFolder(controlDeleteFolder);
NotesView.render(model.state.notes);
foldersView.render(model.state.folders);
ToolsBarView.addHandlerSearchNote(controlSearchNote);
NoteContentView.addHandlerShowNote(controlShowNote);
DeleteConfirmationView.addHandlerDeleteNote(controlDeleteNote);
DeleteConfirmationView.addHandlerDeleteConfirm(controlDeleteConfirmation);
DeleteConfirmationView.addHandlerDeleteFalse(controlDeleteCancel);

foldersView.addHandlerOpenFolder(controlFolderInterface);
AddNoteView.renderFoldersBar(model.state.folders);
foldersView.addHandlerOpenMainFolder(controlMainFolderInterface);
const btn = document.querySelector('.navbar-header h2');
const foldersDiv = document.querySelector('.folders-container');
const icon = document.querySelector('.fa-chevron-down');

btn.addEventListener('click', () => {
  foldersDiv.classList.toggle('folders-container-active');
  icon.classList.toggle('fa-chevron-down-active');
});

// sorting
const controlSort = function(keySort) {
  model.mapSortFunc.get(keySort)();
  NotesView.render(model.state.currentNotesView);
};

ToolsBarView.addHandlerSort(controlSort);

// pin
const controlPinNote = function(noteId) {
  model.pinNote(noteId);
  NotesView.render(model.state.currentNotesView);
};

NotesView.addHandlerPinNote(controlPinNote);
