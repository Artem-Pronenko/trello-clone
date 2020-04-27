//
'use strict';

class Trello {
	constructor({noteId, columnId}) {
		this.noteId = noteId;
		this.columnId = columnId;
	}

	init() {
		document.querySelectorAll('.column').forEach(this.addNotes.bind(this));
		document.querySelectorAll('.note').forEach(this.editText.bind(this));
		document.querySelectorAll('.column-header').forEach(this.editText.bind(this));
		this.addColumn();
	}

	addNotes(columnEl) {
		const btnAddNote = columnEl.querySelector('[data-action-addNote]');
		btnAddNote.addEventListener('click', evt => {
			const note = document.createElement('div');
			note.classList.add('note');
			note.setAttribute('draggable', 'true');
			note.setAttribute('data-note-id', this.noteId.toString());
			this.noteId++;
			columnEl.querySelector('[data-notes]').append(note);
			this.editText(note);
		});
	}

	addColumn() {
		const btnAddColumn = document.querySelector('[data-action-addColumn]'),
			columnHTML = `
				<p class="column-header">В плане</p>
				<div data-notes></div>
				<p class="column-footer">
					<span data-action-addNote class="action">+ Добавить карточку</span>
				</p>
			`;
		btnAddColumn.addEventListener('click', evt => {
			const column = document.createElement('div');
			column.classList.add('column');
			column.setAttribute('draggable', 'true');
			column.setAttribute('data-column-id', this.columnId.toString());
			this.columnId++;
			column.innerHTML = columnHTML;
			document.querySelector('[data-columns-list]').append(column);
			this.addNotes(column);
		});
	}

	editText(item) {
		item.addEventListener('dblclick', () => {
			item.setAttribute('contenteditable', 'true');
			item.focus();
		});
		item.addEventListener('blur', () => item.removeAttribute('contenteditable'));
		
	}


}

const trello = new Trello({
	noteId: 8,
	columnId: 4
});
trello.init();



















