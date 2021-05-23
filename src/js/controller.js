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

const controlFindNote = function() {
  const text = ToolsBarView.getText();
  let array = model.findNotes(text);
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(array);
}

const controlShowNote = function(id) {
  const note = model.findNoteById(id);
  NoteContentView.setTitle(note.title);
  NoteContentView.setDescription(note.description);
  NoteContentView.toogleWindow();
  console.log(note);
};

function controlAddFolder() {
  const name = addFolderView.getName();
  model.addFolder(name);
  addFolderView.clearInputs();
  addFolderView.toogleWindow();
  foldersView.render(model.state.folders);
}

addFolderView.addHandlerAddFolder(controlAddFolder);
model.mapSortFunc.get(model.state.currentSorting)();
NotesView.render(model.state.notes);
foldersView.render(model.state.folders);
AddNoteView.addHandlerAddNote(controlAddNote);
NotesView.addHandlerDeleteNote(controlDeleteNote);
NoteContentView.addHandlerShowNote(controlShowNote);
ToolsBarView.addHandlerFindNote(controlFindNote);

const btn = document.querySelector('.navbar-header h2');
const foldersDiv = document.querySelector('.folders-container');
const icon = document.querySelector('.fa-chevron-down');

btn.addEventListener('click', () => {
  foldersDiv.classList.toggle('folders-container-active');
  icon.classList.toggle('fa-chevron-down-active');
});

// sorting
const controlSortByTime = function() {
  if (!model.state.statusTimeSort) {
    model.sortFirstLater();
    model.state.statusTimeSort = 1;
  } else {
    model.sortFirstEarlier();
    model.state.statusTimeSort = 0;
  }
  NotesView.render(model.state.currentNotesView);
}

ToolsBarView.addHandlerSortByTime(controlSortByTime);

const controlSortByAbc = function() {
  model.sortByAZ();
  NotesView.render(model.state.currentNotesView);
};

ToolsBarView.addHandlerSortByAbc(controlSortByAbc);

const controlSortByCba = function() {
  model.sortByZA();
  NotesView.render(model.state.currentNotesView);
};

ToolsBarView.addHandlerSortByCba(controlSortByCba);

const controlPinNote = function(noteId) {
  if (model.state.pinNoteID) {
    const currentPinnedNote = model.findNoteById(model.state.pinNoteID);
    currentPinnedNote.isPinned = false;
  }
  model.state.pinNoteID = noteId;
  const newPinnedNote = model.findNoteById(noteId);
  newPinnedNote.isPinned = true;
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(model.state.currentNotesView);
};

NotesView.addHandlerPinNote(controlPinNote);