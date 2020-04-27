//
'use strict';
let noteId = 8, columnId = 4;

const addNotes = columnEl => {
	const btnAddNote = columnEl.querySelector('[data-action-addNote]');
	btnAddNote.addEventListener('click', evt => {
		const note = document.createElement('div');
		note.classList.add('note');
		note.setAttribute('draggable', 'true');
		note.setAttribute('data-note-id', noteId.toString());
		noteId++;
		columnEl.querySelector('[data-notes]').append(note);
	});
};
document.querySelectorAll('.column').forEach(addNotes);


const addColumn = () => {
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
		column.setAttribute('data-column-id', columnId.toString());
		columnId++;
		column.innerHTML = columnHTML;
		document.querySelector('[data-columns-list]').append(column);
		addNotes(column);
	});
};
addColumn();



















