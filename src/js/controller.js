import * as model from '../js/model.js';
import NotesView from './views/notesView.js';
import NotesAppView from './views/notesAppView.js';
import AddNoteView from './views/addNoteView.js';

const controlAddNote = function () {
    const title = AddNoteView.getTitle();
    const description = AddNoteView.getDescription();
    const time = new Date().getTime();
    model.addNote(title, description, time, 'Важливе');
    AddNoteView.clearInputs();
    AddNoteView.toogleWindow();
    NotesView.render(model.state.notes);
};

NotesView.render(model.state.notes);
AddNoteView.addHandlerAddNote(controlAddNote);

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