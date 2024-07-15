const CURRENT_USERS_NOTEBOOKS = 'notebooks/current';
const CREATE_NEW_NOTEBOOK = 'notebooks/new';

const currentUsersNotebooks = (notebooks) =>({
    type: CURRENT_USERS_NOTEBOOKS,
    notebooks,
})

const createNewNotebook = (notebook) => ({
    type: CREATE_NEW_NOTEBOOK,
    notebook,
});

export const thunkGetCurrentUsersNotebooks = () => async (dispatch) => {
    const res = await fetch('/api/notebooks/current');
    if (res.ok) {
        const usersNotebooks = await res.json();
        await dispatch(currentUsersNotebooks(usersNotebooks.notebooks))
    } else {
        const error = await res.json()
        return error;
    }
}

export const thunkCreateNewNotebook = (notebook) => async (dispatch) => {
    const res = await fetch('/api/notebooks/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(notebook)
    });

    if (res.ok) {
        const newNotebook = await res.json();
        dispatch(createNewNotebook(newNotebook));
        return newNotebook;
    } else {
        const error = await res.json();
        return error
    }
};

const initialState = {
    userNotebooks: [],
}

export default function notebookReducer(state = initialState, action) {
    switch (action.type) {
        case CURRENT_USERS_NOTEBOOKS:
            return {
                ...state,
                userNotebooks: action.notebooks,
            };
        case CREATE_NEW_NOTEBOOK:
            return {
                ...state,
                userNotebooks: [...state.userNotebooks, action.notebook]
            }
        default:
            return state;
    }

}
