//Action types
const CURRENT_USERS_NOTES = 'notes';
const CREATE_NEW_NOTE = 'notes/create';
const UPDATE_NOTE = 'notes/:noteId/edit';
const DELETE_NOTE = 'notes/:noteId/delete';
const FETCH_NOTES_ERROR = 'notes/error';

//Action creators
const fetchNotesError = (error) => ({
    type: FETCH_NOTES_ERROR,
    error,
});

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

//Thunks
export const thunkGetCurrentUsersNotes = () => async (dispatch) => {
    try {
        // Fetch notes from the API endpoint
        const res = await fetch('/api/notes/');

        // Check if the response is OK (status in the range 200-299)
        if (res.ok) {
            // Parse the JSON response
            const usersNotes = await res.json();

            // Ensure the notes property exists in the response
            if (usersNotes && Array.isArray(usersNotes.notes)) {
                // Dispatch action to update the Redux store with the fetched notes
                dispatch(currentUsersNotes(usersNotes.notes));
            }
        } else {
            // Handle non-OK responses
            const error = await res.json();
            dispatch(fetchNotesError(error));
        }
    } catch (err) {
        // Catch and log any errors that occur during the fetch operation
        dispatch(fetchNotesError(err));
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

// Initial state
const initialState = {
    userNotes: [],
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
        // case UPDATE_NOTE:
        //     return {
        //         ...state,
        //         userNotes: state.userNotes.map((note) =>
        //             note.id === action.note.id ? action.note : note
        //         ),
        //     };
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
        case 'UPDATE_NOTE_ID':
            return {
                ...state,
                userNotes: state.userNotes.map(note =>
                    note.id === action.note.id ? action.note : note
                )
            };
        default:
            return state;
    }
}
