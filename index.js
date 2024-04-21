document.getElementById('addNote').addEventListener('click', addNote);
window.addEventListener('load', loadNotes);

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => addNoteToDOM(note));
}

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();
    if (noteText) {
        addNoteToDOM(noteText);
        saveNote(noteText);
        noteInput.value = '';
    }
}

function addNoteToDOM(noteText) {
    const notesList = document.getElementById('notesList');
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.textContent = noteText;

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function () {
        deleteNote(noteElement, noteText);
    };

    noteElement.appendChild(deleteBtn);
    notesList.appendChild(noteElement);
}

function saveNote(noteText) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNote(noteElement, noteText) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const filteredNotes = notes.filter(note => note !== noteText);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    noteElement.remove();
}