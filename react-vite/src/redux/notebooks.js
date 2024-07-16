//Action types
const CURRENT_USERS_NOTEBOOKS = 'notebooks';
const CREATE_NEW_NOTEBOOK = 'notebooks/new';
const UPDATE_NOTEBOOK = 'notebooks/:notebookId/edit';
const DELETE_NOTEBOOK = 'notebooks/:notebookId/delete'

//Action creators
const currentUsersNotebooks = (notebooks) => ({
    type: CURRENT_USERS_NOTEBOOKS,
    notebooks,
})

const createNewNotebook = (notebook) => ({
    type: CREATE_NEW_NOTEBOOK,
    notebook,
});

const updateNotebook = (notebook) => ({
    type: UPDATE_NOTEBOOK,
    notebook,
})

const deleteNotebook = (notebookId) => ({
    type: DELETE_NOTEBOOK,
    notebookId,
})

//Thunks
export const thunkGetCurrentUsersNotebooks = () => async (dispatch) => {
    const res = await fetch('/api/notebooks/');
    if (res.ok) {
        const usersNotebooks = await res.json();
        console.log('Fetched Notebooks: ', usersNotebooks);
        dispatch(currentUsersNotebooks(usersNotebooks.notebooks));
    } else {
        const error = await res.json();
        console.error('Failed to fetch notebooks:', error);
        return error;
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
        dispatch(createNewNotebook(newNotebook.notebook));
        dispatch(thunkGetCurrentUsersNotebooks());
        return { notebook: newNotebook.notebook };
    } else {
        const error = await res.json();
        return { errors: error };
    }
};

export const thunkUpdateNotebooks = (notebook) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebook.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(notebook),
    });
    if (res.ok) {
        const updatedNotebook = await res.json();
        dispatch(updateNotebook(updatedNotebook));
        dispatch(thunkGetCurrentUsersNotebooks());
        return updatedNotebook;
    } else {
        const error = await res.json()
        return error;
    }
}

export const thunkDeleteNotebook = (notebookId) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(deleteNotebook(notebookId));
        dispatch(thunkGetCurrentUsersNotebooks());
        return {};
    } else {
        const error = await res.json()
        return { errors: error };
    }
}

//Inital state
const initialState = {
    userNotebooks: [],
};

//Reducer
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
        case UPDATE_NOTEBOOK: {
            const updatedNotebook = action.notebook;
            return {
                ...state,
                userNotebooks: state.userNotebooks.map(notebook =>
                    notebook.id === updatedNotebook.id ? updatedNotebook : notebook),
            };
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
