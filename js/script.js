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
		item.addEventListener('dragstart', dragNote.dragstartItem.bind(this));
		item.addEventListener('dragend', dragNote.dragendItem.bind(this));
		item.addEventListener('dragenter', dragNote.dragenterItem.bind(this));
		item.addEventListener('dragover', dragNote.dragoverItem.bind(this));
		item.addEventListener('dragleave', dragNote.dragleaveItem.bind(this));
		item.addEventListener('drop', dragNote.dropItem.bind(this));
	}


}


class DragNote extends Trello {
	constructor({noteId, columnId}) {
		super({noteId, columnId});
		this.draggedElem = null;
	}

	dragstartItem(event) {
		this.draggedElem = event.target;
		event.target.classList.add('dragged')
	}

	dragendItem(event) {
		this.draggedElem = null;
		event.target.classList.remove('dragged')
	}

	dragenterItem(event) {
		if (event.target === this.draggedElem) return false;
		event.target.classList.add('under');
	}

	dragoverItem(event) {
		event.preventDefault();
		if (event.target === this.draggedElem) return false;
	}

	dragleaveItem(event) {
		if (event.target === this.draggedElem) return false;
		event.target.classList.remove('under');
	}


	dropItem(event) {
		event.preventDefault();
		event.stopPropagation();
		const {target} = event;
		if (target === this.draggedElem) return false;
		target.classList.remove('under');

		if (target.parentNode === this.draggedElem.parentNode) {
			const allNote = Array.from(target.parentNode.querySelectorAll(`.${target.className}`));
			const targetIndex = allNote.indexOf(target);
			const dragElIndex = allNote.indexOf(this.draggedElem);
			console.log('targetIndex:', targetIndex);
			console.log('dragElIndex:', dragElIndex);

			if (dragElIndex > targetIndex) {
				target.parentNode.insertBefore(this.draggedElem, target)
			} else if (dragElIndex < targetIndex) {
				target.parentNode.insertBefore(this.draggedElem, target.nextElementSibling)
			}

		} else {
			target.parentNode.insertBefore(this.draggedElem, target);
		}
	}

}


const dragNote = new DragNote({
	noteId: 8,
	columnId: 4
});
dragNote.init();


