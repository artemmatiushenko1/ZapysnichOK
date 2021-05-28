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
  const folder = AddNoteView.getSelectedFolder();
  console.log(folder);
  const createdNote = model.addNote(title, description, time, folder);
  AddNoteView.clearInputs();
  model.addNoteToFolder(createdNote);
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
  AddNoteView.renderFoldersBar(model.state.folders);
  addFolderView.toogleWindow();
}

function controlDeleteFolder(id) {
  const folder = model.findFolderById(id);
  for (const note of folder.notes) {
    model.deleteNote(note.id);
  }
  model.deleteFolder(id);
  foldersView.render(model.state.folders);
  NotesView.render(model.state.notes);
  AddNoteView.renderFoldersBar(model.state.folders);
}

addFolderView.addHandlerAddFolder(controlAddFolder);
model.mapSortFunc.get(model.state.currentSorting)();
AddNoteView.addHandlerAddNote(controlAddNote);
NotesView.addHandlerDeleteNote(controlDeleteNote);
foldersView.addHandlerDeleteFolder(controlDeleteFolder);
NotesView.render(model.state.notes);
foldersView.render(model.state.folders);
ToolsBarView.addHandlerSearchNote(controlSearchNote);
NoteContentView.addHandlerShowNote(controlShowNote);
AddNoteView.renderFoldersBar(model.state.folders);
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
