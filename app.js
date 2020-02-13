const noteTitleElement = document.getElementById("noteTitle");
const noteTextElement = document.getElementById("noteText");
const addNoteButton = document.getElementById("addNoteButton");
const noteForm = document.getElementById("noteForm");

class Note {
  constructor(title, text) {
    this.title = title;
    this.text = text;
    this.date = moment().format("HH:MM | DD-MM-YY");
  }
}

class Store {
  static getNotes() {
    let notes;
    if (localStorage.getItem("notes") === null) {
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem("notes"));
    }
    return notes;
  }

  static addNotes(note) {
    const notes = Store.getNotes();

    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  static removeNote(date) {
    const notes = Store.getNotes();
    notes.forEach((note, index) => {
      if (note.date === date) {
        notes.splice(index, 1);
      }
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}

class Interface {
  static displayNotes() {
    const notes = Store.getNotes();

    notes.forEach(note => Interface.addNoteToList(note));
  }

  static addNoteToList(note) {
    const list = document.querySelector(".notes");

    const div = document.createElement("div");
    div.classList.add("note");
    div.innerHTML = `
    <h2><strong>${note.title}</strong></h2>
    <small>${note.date}</small>
    <p>${note.text}</p>
  `;
    list.appendChild(div);
  }
  static clearFields() {
    noteTitleElement.value = "";
    noteTextElement.value = "";
  }
}
document.addEventListener("DOMContentLoaded", Interface.displayNotes);
noteForm.addEventListener("submit", e => {
  e.preventDefault();

  const title = noteTitleElement.value;
  const text = noteTextElement.value;

  if (title === "" || text === "") {
    return;
  } else {
    const note = new Note(title, text);
    Interface.addNoteToList(note);
    Store.addNotes(note);
    Interface.clearFields();
  }
});
