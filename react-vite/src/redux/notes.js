//Action types
const CURRENT_USERS_NOTES = 'notes';

//Action creators
const currentUsersNotes = (notes) => ({
    type: CURRENT_USERS_NOTES,
    notes,
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
        default:
            return state;
    }
}
