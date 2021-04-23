import * as model from './src/js/model.js';
console.dir("Hello world!🧠;)"); //привет

function getFoldersNames() {
    let foldersNames = [];
    let folders = Array.from(document.querySelectorAll('.folder a'));
    for (let element of folders) {
        foldersNames.push(element.textContent);
    }
    return foldersNames;
}

//Test modal window
const addNoteInput = document.querySelector('.add-note-input');
const overlay = document.querySelector('.overlay');
const addNoteModal = document.querySelector('.add-note-window');
const noteHeadlineInput = document.querySelector('.note-headline-input');

addNoteInput.addEventListener('focus', function () {
    overlay.classList.remove('hidden');
    addNoteModal.classList.remove('hidden');
    addNoteInput.blur();
});

addNoteModal.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.closest('.btn-close-modal')) {
        overlay.classList.add('hidden');
        overlay.classList.add('hidden');
    }
})

const deleteAllNotesBtn = document.querySelector('.delete-all-btn');
const noteCollection = document.querySelectorAll('.note');

deleteAllNotesBtn.addEventListener('click', function () {
    const confirmation = confirm('Ви дійсно бажаєте очистити список заміток?');
    if (confirmation) {
        for (const element of noteCollection) {
            element.remove();
        }
    }
});