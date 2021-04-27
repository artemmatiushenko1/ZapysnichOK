export const state = {
    notes: [],
    notesId: [],
    folders: {
        'Важливе': [],
    }
}

class Note {
    constructor(headline, description, time, folder) {
        this.headline = headline;
        this.description = description;
        this.time = time;
        this.folder = folder;
        this.id = this._generateId();
    }

    _generateId = function () {
        let id = new Date().getTime();
        while (state.notesId.includes(id)) {
            id++;
        }
        state.notesId.push(id);
        return id;
    }
}

for (let i = 0; i < 10; i++) {
    let date = normalizationFormat(new Date());
    state.notes.push(new Note("Заголовок", "Опис", date, 'Важливе'));
}

console.log(state);

function normalizationFormat(data){
    let formatter = new Intl.DateTimeFormat("uk", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
     return data = formatter.format(data)
                            .replace(',', '');
}
