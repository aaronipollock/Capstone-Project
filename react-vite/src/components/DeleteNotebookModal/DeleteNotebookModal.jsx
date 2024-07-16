import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteNotebook } from "../../redux/notebooks";
import './DeleteNotebookModal.css'
import { useState, useEffect } from "react";

function DeleteNotebookModal({ notebookId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notebook = useSelector((state) =>
        state.notebooks.userNotebooks.find((nb) => nb.id === notebookId))
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

        if (notebook.user_id !== currentUser.id) {
            setErrors({ user: "You are not authorized." });
            return
        }

        const serverResponse = await dispatch(thunkDeleteNotebook(notebookId));

        if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            closeModal();
            navigate('/notebooks');
        }
    };

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
