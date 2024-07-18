//Action types
const CURRENT_USERS_NOTEBOOKS = 'notebooks';
const CREATE_NEW_NOTEBOOK = 'notebooks/create';
const UPDATE_NOTEBOOK = 'notebooks/:notebookId/edit';
const DELETE_NOTEBOOK = 'notebooks/:notebookId/delete';
const NOTEBOOK_DETAILS = 'notebook/notes';

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

const notebookDetails = (notebookId, notes) => ({
    type: NOTEBOOK_DETAILS,
    notebookId,
    notes
})

//Thunks
export const thunkGetCurrentUsersNotebooks = () => async (dispatch) => {
    const res = await fetch('/api/notebooks/');
    if (res.ok) {
        const usersNotebooks = await res.json();
        // console.log('Fetched Notebooks: ', usersNotebooks);
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

export const thunkGetNotebookDetails = (notebookId) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}/notes`, {
        method: 'GET',
    });
    if (res.ok) {
        const data = await res.json();
        console.log('Fetched Notebook Details:', data);
        dispatch(notebookDetails(notebookId, data.notes));
        return data;
    } else {
        const error = await res.json()
        return { errors: error };
    }
}
// export const thunkGetNotebookDetails = (notebookId) => async (dispatch) => {
//     const response = await fetch(`/api/notebooks/${notebookId}`);
//     const notebook = await response.json();
//     dispatch({ type: 'notebook/:notebookId', notebook });
// };

//Inital state
const initialState = {
    userNotebooks: [],
    notebookDetails: {
        // notes: [],
    },
};

//Reducer
export default function notebookReducer(state = initialState, action) {
    switch (action.type) {
        case CURRENT_USERS_NOTEBOOKS:
            // console.log('Reducing CURRENT_USERS_NOTEBOOKS action:', action);
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
            return {
                ...state,
                notebookDetails: {
                    ...state.notebookDetails,
                    [action.notebookId]: action.notes,
                    // notes: state.notebookDetails.notes
                    //     ? [...state.notebookDetails.notes, action.note]
                    //     : [action.note]
                },
            };
        default:
            return state;
    }

}
