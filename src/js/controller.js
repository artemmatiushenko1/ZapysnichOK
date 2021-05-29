import * as model from '../js/model.js';
import NotesView from './views/notesView.js';
import AddNoteView from './views/addNoteView.js';
import { addFolderView, foldersView } from './views/foldersView.js';
import NoteContentView from './views/noteContentView.js';
import ToolsBarView from './views/toolsBarView.js';

const controlAddNote = function() {
  if (!model.state.activeNote) {
    const title = AddNoteView.getTitle();
    const description = AddNoteView.getDescription();
    const time = new Date().getTime().toString();
    model.addNote(title, description, time, 'Важливе');
  } else {
    const editedTitle = AddNoteView.getTitle();
    const editedDescription = AddNoteView.getDescription();
    const activeNoteId = model.state.activeNote;
    if (activeNoteId) {
      model.updateNote(activeNoteId, editedTitle, editedDescription);
      model.state.activeNote = null;
      NoteContentView.resetActiveNoteId();
    }
  }

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
  addFolderView.toogleWindow();
}

function controlDeleteFolder(id) {
  model.deleteFolder(id);
  foldersView.render(model.state.folders);
}

NoteContentView.addHandlerEditNote(controlEditNote);
addFolderView.addHandlerAddFolder(controlAddFolder);
model.mapSortFunc.get(model.state.currentSorting)();
NotesView.render(model.state.currentNotesView);
foldersView.render(model.state.folders);
AddNoteView.addHandlerAddNote(controlAddNote);
NotesView.addHandlerDeleteNote(controlDeleteNote);
foldersView.addHandlerDeleteFolder(controlDeleteFolder);
ToolsBarView.addHandlerSearchNote(controlSearchNote);
NoteContentView.addHandlerShowNote(controlShowNote);

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
