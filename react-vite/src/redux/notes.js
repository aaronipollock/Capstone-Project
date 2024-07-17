//Action types
const CURRENT_USERS_NOTES = 'notes';
const CREATE_NEW_NOTE = 'notes/create';

//Action creators
const currentUsersNotes = (notes) => ({
    type: CURRENT_USERS_NOTES,
    notes,
})

const createNewNote = (note) => ({
    type: CREATE_NEW_NOTE,
    note,
})

//Thunks
export const thunkGetCurrentUsersNotes = () => async (dispatch) => {
    const res =await fetch('/api/notes/');
    if (res.ok) {
        const usersNotes = await res.json();
        console.log('Fetched Notes: ', usersNotes);
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
        default:
            return state;
    }
}
