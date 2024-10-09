import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notebooks: [],
    notesByNotebookId: {},
    globalTags: [],
}

const notebooksSlice = createSlice({
    name: 'notebooks',
    initialState,
    reducers: {
        setNotebooks: (state, action) => {
            const notebooks = action.payload;
            notebooks.forEach(notebook => {
                state.notesByNotebookId[notebook.id] = notebook.notes;
            });
        },
        dumpNotebooks: () => [],
        removeNoteFromNotebook: (state, action) => {
            const { notebookId, noteId } = action.payload;
            return {
                ...state,
                notesByNotebookId: {
                    ...state.notesByNotebookId,
                    [notebookId]: state.notesByNotebookId[notebookId]?.filter(note => note.id !== noteId),
                },
            };
        },
        updateNoteInNotebook: (state, action) => {
            const { notebookId, note } = action.payload;
            const notebookNotes = state.notesByNotebookId[notebookId] || [];
            state.notesByNotebookId[notebookId] = notebookNotes.map(n =>
                n.id === note.id ? note : n
            );
        }
    }
});

export const { setNotebooks, dumpNotebooks, removeNoteFromNotebook, updateNoteInNotebook } = notebooksSlice.actions;
export default notebooksSlice.reducer;
