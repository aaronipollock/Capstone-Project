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

//Thunks
export const thunkGetCurrentUsersNotes = () => async (dispatch) => {
    const res =await fetch('/api/notes/');
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

export const thunkCreateNewNote = (note) => async (dispatch) => {
    const res = await fetch('/api/notes/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note)
    });

    if (res.ok) {
        const newNote = await res.json();
        dispatch(createNewNote(newNote.note));
        dispatch(thunkGetCurrentUsersNotes());
        return { note: newNote.note };
    } else {
        const error = await res.json();
        return { errors: error };
    }
};

export const thunkUpdateNote = (note) => async (dispatch) => {
    const res = await fetch(`/api/notes/${note.id}/edit`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note),
    });
    if (res.ok) {
        const updatedNote = await res.json();
        dispatch(updateNote(updatedNote));
        dispatch(thunkGetCurrentUsersNotes());
        return updatedNote;
    } else {
        const error = await res.json()
        return error;
    }
}

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
        return {errors: error };
    }
}

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
        default:
            return state;
    }
}
