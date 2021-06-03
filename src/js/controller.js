import * as model from '../js/model.js';
import NotesView from './views/notesView.js';
import AddNoteView from './views/addNoteView.js';
import FoldersView from './views/foldersView.js';
import AddFolderView from './views/addFolderView.js';
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
    model.addNote(title, description, time, folder);
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

const controlShowArchive = function (keyShow) {
  const corection = model.state.archive.length;
  if (keyShow || !corection) {
    NotesView.render(model.state.currentNotesView);
  } else {
    NotesView.render(model.state.archive);
  }
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
  const name = AddFolderView.getName();
  if (name) {
    model.addFolder(name);
    FoldersView.render(model.state.folders);
    AddFolderView.clearInputs();
    AddNoteView.renderFoldersBar(model.state.folders);
  }
  AddFolderView.toogleWindow();
}

function controlDeleteFolder(id) {
  model.deleteFolder(id);
  NotesView.render(model.state.notes);
  FoldersView.render(model.state.folders);
  AddNoteView.renderFoldersBar(model.state.folders);
}

function controlFolderInterface(folderId = model.mainFolderName) {
  const folder =
    folderId === model.mainFolderName
      ? model.state
      : model.findFolderById(folderId);
  model.state.activeNotes = folder.notes;
  model.mapSortFunc.get(model.state.currentSorting)();
  NotesView.render(model.state.currentNotesView);
}

NoteContentView.addHandlerEditNote(controlEditNote);
AddFolderView.addHandlerAddFolder(controlAddFolder);
model.mapSortFunc.get(model.state.currentSorting)();
AddNoteView.addHandlerAddNote(controlAddNote);
FoldersView.addHandlerDeleteFolder(controlDeleteFolder);
NotesView.render(model.state.notes);
FoldersView.render(model.state.folders);
ToolsBarView.addHandlerSearchNote(controlSearchNote);
NoteContentView.addHandlerShowNote(controlShowNote);
DeleteConfirmationView.addHandlerDeleteNote(controlDeleteNote);
DeleteConfirmationView.addHandlerDeleteConfirm(controlDeleteConfirmation);
DeleteConfirmationView.addHandlerDeleteFalse(controlDeleteCancel);
FoldersView.addHandlerOpenFolder(controlFolderInterface);
AddNoteView.renderFoldersBar(model.state.folders);
FoldersView.addHandlerOpenMainFolder(controlFolderInterface);
ToolsBarView.addHandlerShowArchive(controlShowArchive);

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
