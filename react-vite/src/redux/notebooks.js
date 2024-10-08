//Action types
const CURRENT_USERS_NOTEBOOKS = 'notebooks';
const CREATE_NEW_NOTEBOOK = 'notebooks/create';
const UPDATE_NOTEBOOK = 'notebooks/:notebookId/edit';
const DELETE_NOTEBOOK = 'notebooks/:notebookId/delete';
// const NOTEBOOK_DETAILS = 'notebook/notes';
// Define the constant for the action type
export const NOTEBOOK_DETAILS = 'NOTEBOOK_DETAILS';

const SET_NOTEBOOK_ERRORS = 'notebooks/SET_NOTEBOOK_ERRORS';


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

const notebookDetails = (notebook) => ({
    type: NOTEBOOK_DETAILS,
    payload: notebook,
})

const setNotebookErrors = (errors) => ({
    type: SET_NOTEBOOK_ERRORS,
    errors,
});

//Thunks
export const thunkGetCurrentUsersNotebooks = () => async (dispatch) => {
    const res = await fetch('/api/notebooks/');
    if (res.ok) {
        const usersNotebooks = await res.json();
        dispatch(currentUsersNotebooks(usersNotebooks.notebooks));
    } else {
        const error = await res.json();
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
        dispatch(setNotebookErrors(error));
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

export const thunkGetNotebookDetails = (notebookId) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}/notes`, {
        method: 'GET',
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(notebookDetails(data));
        return data;
    } else {
        const error = await res.json()
        return { errors: error };
    }
};

//Inital state
const initialState = {
    userNotebooks: [],
    notebookDetails: {},
    error: null
};

//Reducer
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
        case NOTEBOOK_DETAILS:
            console.log("Entire state:", state);
            console.log("Tags in notes slice:", state.notes?.tags);
            return {
                ...state,
                notebookDetails: {
                    ...state.notebookDetails,
                    [action.payload.id]: action.payload,
                },
            };
        default:
            return state;
    }

}
