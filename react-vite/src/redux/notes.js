//Action types
const CURRENT_USERS_NOTES = 'notes';
const CREATE_NEW_NOTE = 'notes/create';
const UPDATE_NOTE = 'notes/:noteId/edit';
const DELETE_NOTE = 'notes/:noteId/delete';

//Action creators
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
    const res = await fetch('/api/notes/');
    if (res.ok) {
        const usersNotes = await res.json();
        // console.log('Fetched Notes: ', usersNotes);
        dispatch(currentUsersNotes(usersNotes.notes));
    } else {
        const error = await res.json();
        console.error('Failed to fetch notes:', error);
        return error;
    }
};

export const thunkCreateNewNote = ({ title, content, notebookId }) => async (dispatch) => {
    console.log("Dispatching thunkCreateNewNote with:", { title, content, notebookId });

    const res = await fetch('/api/notes/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, notebookId })
    });

    if (!res.ok) {
        const error = await res.json();
        console.error("Error creating note:", error);
        return { errors: error };
    }

    const newNote = await res.json();
    console.log("Note created:", newNote);

    dispatch(createNewNote(newNote.note));
    dispatch(thunkGetCurrentUsersNotes());
    return { note: newNote.note };

};

export const thunkUpdateNote = (note) => async (dispatch) => {
    try {
        console.log('Sending update request to server: ', note);

        const res = await fetch(`/api/notes/${note.id}/edit`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note),
        });
        if (!res.ok) {
            const errorData = await res.json();
            console.log('Server responded with an error: ', errorData);
            throw new Error(errorData.message || 'Failed to update note');
        }

        const updatedNote = await res.json();
        console.log('Received updated note from server: ', updatedNote);

        dispatch(updateNote(updatedNote));
        dispatch(thunkGetCurrentUsersNotes());

        return { success: true, note: updatedNote };
    } catch (error) {
        console.log.error('Error updating note: ', error);
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
