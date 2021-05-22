import * as model from '../js/model.js';
import NotesView from './views/notesView.js';
import AddNoteView from './views/addNoteView.js';
import AddFolderView from './views/addFolderView.js';
import NoteContentView from './views/noteContentView.js';
import ToolsBarView from './views/toolsBarView.js';

const controlAddNote = function() {
  const title = AddNoteView.getTitle();
  const description = AddNoteView.getDescription();
  const time = new Date().getTime().toString();
  model.addNote(title, description, time, 'Важливе');
  AddNoteView.clearInputs();
  AddNoteView.toogleWindow();
  NotesView.render(model.state.notes);
};

const controlDeleteNote = function(id) {
  model.deleteNote(id);
  NotesView.render(model.state.notes);
};

const controlShowNote = function(id) {
  const note = model.findNoteById(id);
  NoteContentView.setTitle(note.title);
  NoteContentView.setDescription(note.description);
  NoteContentView.toogleWindow();
  console.log(note);
};

NotesView.render(model.state.notes);
AddNoteView.addHandlerAddNote(controlAddNote);
NotesView.addHandlerDeleteNote(controlDeleteNote);
NoteContentView.addHandlerShowNote(controlShowNote);

const btn = document.querySelector('.navbar-header h2');
const foldersDiv = document.querySelector('.folders-container');
const icon = document.querySelector('.fa-chevron-down');

btn.addEventListener('click', () => {
  foldersDiv.classList.toggle('folders-container-active');
  icon.classList.toggle('fa-chevron-down-active');
});

// sorting
const btnSortByTime = document.querySelector('.btn-sort-older-first');
let statusTimeSort = 0;
btnSortByTime.addEventListener('click', () => {
  if (!statusTimeSort) {
    model.sortFirstLater();
    statusTimeSort = 1;
  } else {
    model.sortFirstEarlier();
    statusTimeSort = 0;
  }
  NotesView.render(model.state.currentNotesView);
});

const btnSortByAbc = document.querySelector('.btn-sort-a-to-z');
btnSortByAbc.addEventListener('click', () => {
  model.sortByAZ();
  NotesView.render(model.state.currentNotesView);
});

const btnSortByCba = document.querySelector('.btn-sort-z-to-a');
btnSortByCba.addEventListener('click', () => {
  model.sortByZA();
  NotesView.render(model.state.currentNotesView);
});

//pin
const parentElement = document.querySelector('.notes-container');
parentElement.addEventListener('click', (e) => {
  const target = e.target;
  const btnPinNote = target.closest('.btn-pin-note');
  if (btnPinNote) {
    const note = btnPinNote.closest('.note');
    const noteId = note.getAttribute('id');
    model.state.pinNoteID = noteId;
  }
});
