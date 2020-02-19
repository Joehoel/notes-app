const noteTitleElement = document.getElementById('noteTitle');
const noteTextElement = document.getElementById('noteText');
const noteForm = document.getElementById('noteForm');

/**
 * @class Note
 */
class Note {
  constructor(title, text) {
    this.title = title;
    this.text = text;
    // eslint-disable-next-line no-undef
    this.date = moment().format('HH:MM | DD-MM-YY');
  }
}

class Store {
  /**
   * @static
   * @returns
   * @memberof Store
   */
  static getNotes() {
    let notes;
    if (localStorage.getItem('notes') === null) {
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    return notes;
  }

  /**
   * @static
   * @param {*} note
   * @memberof Store
   */
  static addNotes(note) {
    const notes = Store.getNotes();

    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  /**
   * @static
   * @param {*} date
   * @memberof Store
   */
  static removeNote(date) {
    const notes = Store.getNotes();
    notes.forEach((note, index) => {
      if (note.date === date) {
        notes.splice(index, 1);
      }
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}

/**
 * @class Interface
 */
class Interface {
  /**
   * @static
   * @memberof Interface
   */
  static displayNotes() {
    const notes = Store.getNotes();

    notes.forEach(note => Interface.addNoteToList(note));
  }

  /**
   * @static
   * @param {*} note
   * @memberof Interface
   */
  static addNoteToList(note) {
    const list = document.querySelector('.notes');

    const div = document.createElement('div');

    div.classList.add('note');
    div.innerHTML = `
    <h2><strong>${note.title}</strong></h2>
    <small>${note.date}</small>
    <p>${note.text}</p>
  `;
    list.appendChild(div);
  }

  /**
   * @static
   * @memberof Interface
   */
  static clearFields() {
    noteTitleElement.value = '';
    noteTextElement.value = '';
  }
}

document.addEventListener('DOMContentLoaded', Interface.displayNotes);

noteForm.addEventListener('submit', e => {
  e.preventDefault();

  const title = noteTitleElement.value;
  const text = noteTextElement.value;

  if (title === '' || text === '') {
    return false;
  }
  const note = new Note(title, text);

  Interface.addNoteToList(note);
  Store.addNotes(note);
  Interface.clearFields();
});
