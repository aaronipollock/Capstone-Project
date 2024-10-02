import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notes: [],
    tagsByNoteId: {},
    globalTags: [],
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes: (state, action) => {
            return {
                ...state,
                notes: action.payload
            };
        },
        dumpNotes: (state) => {
            return {
                ...state,
                notes: [],
                tagsByNoteId: {},
            };
        },
        setTagsByNoteId: (state, action) => {
            const { noteId, tags } = action.payload;
            return {
                ...state,
                tagsByNoteId: {
                    ...state.tagsByNoteId,
                    [noteId]: tags,
                },
            };
        },
        addTagToNote: (state, action) => {
            const { noteId, newTag } = action.payload;
            // Check if tags for the note exist, if not create an empty array
            const currentTags = state.tagsByNoteId[noteId] || [];
            return {
                ...state,
                tagsByNoteId: {
                    ...state.tagsByNoteId,
                    [noteId]: [...currentTags, newTag], // Add the new tag
                },
            };
        },
        removeTagFromNote: (state, action) => {
            const { noteId, tagId } = action.payload;
            return {
                ...state,
                tagsByNoteId: {
                    ...state.tagsByNoteId,
                    [noteId]: state.tagsByNoteId[noteId].filter(tag => tag.id !== tagId),
                },
            };
        },
        removeTagFromAllNotes: (state, action) => {
            const tagId = action.payload;
            return {
                ...state,
                tagsByNoteId: Object.keys(state.tagsByNoteId).reduce((acc, noteId) => {
                    acc[noteId] = state.tagsByNoteId[noteId].filter(tag => tag.id !== tagId);
                    return acc;
                }, {}),
            };
        },
    },
});

export const { setNotes, dumpNotes, setTagsByNoteId, removeTagFromNote, removeTagFromAllNotes } = notesSlice.actions;
export default notesSlice.reducer;
