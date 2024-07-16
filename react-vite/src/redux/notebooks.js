const CURRENT_USERS_NOTEBOOKS = 'notebooks';
const CREATE_NEW_NOTEBOOK = 'notebooks/new';
const DELETE_NOTEBOOK = 'notebooks/:notebookId/delete'

const currentUsersNotebooks = (notebooks) =>({
    type: CURRENT_USERS_NOTEBOOKS,
    notebooks,
})

const createNewNotebook = (notebook) => ({
    type: CREATE_NEW_NOTEBOOK,
    notebook,
});

const deleteNotebook = (notebookId) => ({
    type: DELETE_NOTEBOOK,
    notebookId,
})

export const thunkGetCurrentUsersNotebooks = () => async (dispatch) => {
    try {
        const res = await fetch('/api/notebooks');
        if (res.ok) {
            const usersNotebooks = await res.json();
            console.log('Fetched Notebooks: ', usersNotebooks);
            dispatch(currentUsersNotebooks(usersNotebooks.notebooks));
        } else {
            const error = await res.json();
            console.error('Failed to fetch notebooks:', error);
            return error;
        }
    } catch (err) {
        console.error('Network error:', err);
    }
};

export const thunkCreateNewNotebook = (notebook) => async (dispatch) => {
    const res = await fetch('/api/notebooks/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(notebook)
    });

    if (res.ok) {
        const newNotebook = await res.json();
        dispatch(createNewNotebook(newNotebook));
        return { notebook: newNotebook };
    } else {
        const error = await res.json();
        return { errors: error };
    }
};

export const thunkDeleteNotebook = (notebookId) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(deleteNotebook(notebookId));
        return {};
    } else {
        const error = await res.json()
        return { errors: error };
    }
}

const initialState = {
    userNotebooks: [],
}

export default function notebookReducer(state = initialState, action) {
    switch (action.type) {
        case CURRENT_USERS_NOTEBOOKS:
            console.log('Reducing CURRENT_USERS_NOTEBOOKS action:', action);
            return {
                ...state,
                userNotebooks: action.notebooks,
            };
        case CREATE_NEW_NOTEBOOK:
            return {
                ...state,
                userNotebooks: [...state.userNotebooks, action.notebook],
            }
        case DELETE_NOTEBOOK:
            return {
                ...state,
                userNotebooks: state.userNotebooks.filter(notebook => notebook.id !== action.notebookId)
            }
        default:
            return state;
    }

}
