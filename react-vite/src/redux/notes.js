import { removeNoteFromNotebook } from './notebooksSlice'

//Action types
const CURRENT_USERS_NOTES = 'notes';
const CREATE_NEW_NOTE = 'notes/create';
const UPDATE_NOTE = 'notes/:noteId/edit';
const DELETE_NOTE = 'notes/:noteId/delete';
const REMOVE_NOTE_FROM_NOTEBOOK = 'notes/:noteId/notebooks/:notebookId/remove';

//Action creators
// const fetchNotesError = (error) => ({
//     type: FETCH_NOTES_ERROR,
//     error,
// });

const currentUsersNotes = (notes) => ({
    type: CURRENT_USERS_NOTES,
    notes,
})

const createNewNote = (note) => ({
    type: CREATE_NEW_NOTE,
    note,
})

const updateNote = (note) => ({
    type: UPDATE_NOTE,
    note,
})

const deleteNote = (noteId) => ({
    type: DELETE_NOTE,
    noteId,
})

const updateNoteIdInStore = (note) => ({
    type: 'UPDATE_NOTE_ID',
    note
})

const setTagsForNote = (payload) => ({
    type: 'SET_TAGS_FOR_NOTE',
    payload
})

//Thunks

export const thunkGetCurrentUsersNotes = () => async (dispatch) => {
    try {
        const res = await fetch('/api/notes/');

        if (res.ok) {
            const usersNotes = await res.json();
            console.log('Notes fetched from backend:', usersNotes);

            if (Array.isArray(usersNotes)) {
                dispatch(currentUsersNotes(usersNotes));
            } else {
                console.error('Unexpected response structure:', usersNotes);
            }
        } else {
            const error = await res.json();
            console.error('Failed to fetch notes:', error);
        }
    } catch (err) {
        console.error('An error occurred while fetching notes:', err);

    }
};

export const thunkCreateNewNote = ({ title, content, notebookId }) => async (dispatch) => {
    const res = await fetch('/api/notes/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, notebookId })
    });

    if (!res.ok) {
        const error = await res.json();
        return { errors: error };
    }

    const newNote = await res.json();

    dispatch(createNewNote(newNote.note));
    dispatch(thunkGetCurrentUsersNotes());
    return { note: newNote.note };

};

export const thunkUpdateNote = (note) => async (dispatch) => {
    try {

        const res = await fetch(`/api/notes/${note.id}/edit`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to update note');
        }

        const updatedNote = await res.json();

        dispatch(updateNote(updatedNote));
        dispatch(thunkGetCurrentUsersNotes());

        return { success: true, note: updatedNote };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const thunkDeleteNote = (noteId) => async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}/delete`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(deleteNote(noteId));
        dispatch(thunkGetCurrentUsersNotes());
        return {};
    } else {
        const error = await res.json()
        return { errors: error };
    }
}

export const thunkUpdateNoteId = (noteId, notebookId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notebook_id: notebookId })
    });

    if (response.ok) {
        const updatedNoteId = await response.json();
        dispatch(updateNoteIdInStore(updatedNoteId));
        return updatedNoteId;
    } else {
        const errors = await response.json();
        return { errors };
    }
};

export const thunkGetTagsForNote = (noteId) => async (dispatch) => {
    const res = await fetch(`/api/tags/notes/${noteId}`);
    if (res.ok) {
        const tags = await res.json();
        dispatch(setTagsForNote({ noteId, tags }));
    }
}

export const thunkRemoveNoteFromNotebook = (notebookId, noteId) => async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}/notebooks/${notebookId}/remove`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeNoteFromNotebook(notebookId, noteId));
    } else {
        console.error("Error removing tag from note:", await res.text());
    }
}

// Initial state
const initialState = {
    userNotes: [],
    tagsByNoteId: {}
}

//Reducer
export default function noteReducer(state = initialState, action) {
    switch (action.type) {
        case CURRENT_USERS_NOTES:
            return {
                ...state,
                userNotes: action.notes,
            };
        case CREATE_NEW_NOTE:
            return {
                ...state,
                userNotes: [...state.userNotes, action.note],
            }
        case UPDATE_NOTE: {
            const updatedNote = action.note;
            return {
                ...state,
                userNote: state.userNotes.map(note =>
                    note.id === updatedNote.id ? updatedNote : note),
            }
        }
        case DELETE_NOTE:
            return {
                ...state,
                userNotes: state.userNotes.filter(note => note.id !== action.noteId)
            }
        case REMOVE_NOTE_FROM_NOTEBOOK:
            const { notebookId, noteId } = action.payload;
            return {
                ...state,
                notesByNotebookId: {
                    ...state.notesByNotebookId,
                    [notebookId]: state.notesByNotebookId[notebookId]?.filter(note => note.id !== action.noteId)
                }
            }
        case 'UPDATE_NOTE_ID':
            return {
                ...state,
                userNotes: state.userNotes.map(note =>
                    note.id === action.note.id ? action.note : note
                )
            }
        case 'SET_TAGS_FOR_NOTE': {
            const { noteId, tags } = action.payload;
            return {
                ...state,
                tagsByNoteId: {
                    ...state.tagsByNoteId,
                    [noteId]: tags
                }
            };
        }
        default:
            return state;
    }
}
