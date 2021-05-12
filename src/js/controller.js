import * as model from '../js/model.js';
import NotesView from './views/notesView.js';
import NotesAppView from './views/notesAppView.js';
import AddNoteView from './views/addNoteView.js';
import NoteContentView from './views/noteContentView.js';

const controlAddNote = function () {
  const title = AddNoteView.getTitle();
  const description = AddNoteView.getDescription();
  const time = new Date().getTime();
  model.addNote(title, description, time, 'Важливе');
  AddNoteView.clearInputs();
  AddNoteView.toogleWindow();
  NotesView.render(model.state.notes);
};

const controlDeleteNote = function (id) {
  model.deleteNote(id);
  NotesView.render(model.state.notes);
};

const controlShowNote = function (id) {
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

//A silly sketch of pagination implementation
/*window.addEventListener('hashchange', function () {
    const hash = window.location.hash.slice(1);
    if (hash === 'notes') {
        NotesAppView.render();
        NotesView.render(model.state.notes);
    }

    if (hash === 'important') {
        document.querySelector('.main-container').innerHTML = '';
        const html = `<p>Important</p>`;
        document.querySelector('.main-container').insertAdjacentHTML('afterbegin', html);
    }
    console.log(hash);
})*/

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
btnSortByTime.addEventListener('click', function () {
    if(!statusTimeSort){
        model.sortFirstLater();
        statusTimeSort = 1;
    } else {
        model.sortFirstEarlier();
        statusTimeSort = 0;
    }
    NotesView.render(model.currentNotesView);
});

const btnSortByAbc = document.querySelector('.btn-sort-a-to-z');
btnSortByAbc.addEventListener('click', function () {
    model.sortByAZ()
    NotesView.render(model.currentNotesView);
});

const btnSortByCba = document.querySelector('.btn-sort-z-to-a');
btnSortByCba.addEventListener('click', function () {
    model.sortByZA()
    NotesView.render(model.currentNotesView);
}); 
