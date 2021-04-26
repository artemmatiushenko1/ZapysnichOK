import * as model from '../js/model.js';
import * as index from '../../index.js'; //to be removed
import NotesView from './views/notesView.js';

NotesView.render(model.state.notes);