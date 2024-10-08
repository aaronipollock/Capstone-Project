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
        setNotebooks: (state, action) => action.payload,
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
    }
});

export const { setNotebooks, dumpNotebooks, removeNoteFromNotebook } = notebooksSlice.actions;
export default notebooksSlice.reducer;
