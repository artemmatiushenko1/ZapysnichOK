import * as model from '../js/model.js';
import NotesView from './views/notesView.js';
import AddNoteView from './views/addNoteView.js';
import { addFolderView, foldersView } from './views/foldersView.js';
import NoteContentView from './views/noteContentView.js';
import ToolsBarView from './views/toolsBarView.js';

const controlAddNote = function() {
  const title = AddNoteView.getTitle();
  const description = AddNoteView.getDescription();
  const time = new Date().getTime().toString();
  model.addNote(title, description, time, 'Важливе');
  AddNoteView.clearInputs();
  AddNoteView.toogleWindow();
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(model.state.currentNotesView);
};

const controlDeleteNote = function(id) {
  if (id === model.state.pinNoteID) model.state.pinNoteID = null;
  model.deleteNote(id);
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(model.state.currentNotesView);
};

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
  addFolderView.toogleWindow();
}

function controlDeleteFolder(id) {
  model.deleteFolder(id);
  foldersView.render(model.state.folders);
}

addFolderView.addHandlerAddFolder(controlAddFolder);
model.mapSortFunc.get(model.state.currentSorting)();
NotesView.render(model.state.currentNotesView);
foldersView.render(model.state.folders);
AddNoteView.addHandlerAddNote(controlAddNote);
NotesView.addHandlerDeleteNote(controlDeleteNote);
foldersView.addHandlerDeleteFolder(controlDeleteFolder);
ToolsBarView.addHandlerSearchNote(controlSearchNote);
NoteContentView.addHandlerShowNote(controlShowNote);

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
