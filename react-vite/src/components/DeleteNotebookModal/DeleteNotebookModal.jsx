import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteNotebook } from "../../redux/notebooks";
import './DeleteNotebookModal.css'
import { useState, useEffect } from "react";

function DeleteNotebookModal({ notebookId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notebook = useSelector((state) => state.notebooks.notebookDetails[notebookId]);
    const [errors, setErrors] = useState({});
    const currentUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();

    useEffect(() => {
        console.log('NOTEBOOK: ', notebook);
        console.log('NOTEBOOK ID: ', notebookId)
        console.log('CURRENT USER: ', currentUser)
    }, [notebook, notebookId, currentUser]);

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault();

        if (!notebook) {
            setErrors({ notebook: "Notebook not found." });
            return;
        }
        // console.log("NOTEBOOK.USER_ID: ", notebook.user_id)
        // if (notebook.user_id !== currentUser.id) {
        //     setErrors({ user: "You are not authorized." });
        //     return
        // }

        const serverResponse = await dispatch(thunkDeleteNotebook(notebookId));

        if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            closeModal();
            navigate('/notebooks');
        }
    };

    if (!notebook) return <p>Loading...</p>

    return (
        <form className="delete-notebook-modal-container" onSubmit={handleDeleteClick}>
            <div className="main-delete-text">Delete notebook?</div>
            <div className="trash-text">Any notes in the notebook will be deleted, as well. This cannot be undone.</div>
            {errors.notebook && <div className="error-text">{errors.notebook}</div>}
            {errors.user && <div className="error-text">{errors.user}</div>}
            <div className="delete-notebook-buttons">
                <button
                    type='button'
                    onClick={handleCancelClick}
                    className="cancel-delete-notebook-button"
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    className="confirm-delete-notebook-button"
                >
                    Delete
                </button>
            </div>
        </form>
    );
}

export default DeleteNotebookModal;
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { thunkGetNotebookDetails, thunkDeleteNotebook } from "../../redux/notebooks";
// import { useModal } from "../../context/Modal";

// function DeleteNotebookModal({ notebookId }) {
//     const dispatch = useDispatch();
//     const notebook = useSelector(state => state.notebooks.notebookDetails[notebookId]);
//     const currentUser = useSelector(state => state.session.user);
//     const { closeModal } = useModal();
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!notebook) {
//             console.log('Fetching notebook details for: ', notebookId);
//             dispatch(thunkGetNotebookDetails(notebookId));
//         }
//     }, [dispatch, notebookId, notebook]);

//     const handleDeleteClick = async () => {
//         try {
//             const response = await dispatch(thunkDeleteNotebook(notebookId));
//             if (response.errors) {
//                 setError(response.errors);
//             } else {
//                 closeModal();
//             }
//         } catch (err) {
//             console.error('Failed to delete notebook:', err);
//             setError('An error occurred while deleting the notebook.');
//         }
//     };

//     if (!notebook) return <p>Loading...</p>;

//     return (
//         <div className="delete-notebook-modal-container">
//             <p>Are you sure you want to delete the notebook: {notebook.title}?</p>
//             {error && <p className="error-message">{error}</p>}
//             <button onClick={handleDeleteClick}>Delete</button>
//             <button onClick={closeModal}>Cancel</button>
//         </div>
//     );
// }

// export default DeleteNotebookModal;
