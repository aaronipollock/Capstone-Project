import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetNotebookDetails, thunkDeleteNotebook } from "../../redux/notebooks";
import { useModal } from "../../context/Modal";
import './DeleteNotebookModal.css'

function DeleteNotebookModal({ notebookId }) {
    const dispatch = useDispatch();
    const notebook = useSelector(state => state.notebooks.notebookDetails[notebookId]);
    // const currentUser = useSelector(state => state.session.user);
    const { closeModal } = useModal();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!notebook) {
            dispatch(thunkGetNotebookDetails(notebookId));
        }
    }, [dispatch, notebookId, notebook]);

    const handleDeleteClick = async () => {
        try {
            const response = await dispatch(thunkDeleteNotebook(notebookId));
            if (response.errors) {
                setError(response.errors);
            } else {
                closeModal();
            }
        } catch (err) {
            setError('An error occurred while deleting the notebook.');
        }
    };

    if (!notebook) return <p>Loading...</p>;

    return (
        <div className="delete-notebook-modal-container">
            <p>Are you sure you want to delete the notebook: {notebook.title}?</p>
            <p>Any notes in the notebook will be deleted, as well. This cannot be undone.</p>
            {error && <p className="error-message">{error}</p>}
            <div className="delete-notebook-buttons">
                <button onClick={closeModal} className="cancel-delete-notebook-button">Cancel</button>
                <button onClick={handleDeleteClick} className="confirm-delete-notebook-button">Delete</button>
            </div>
        </div>
    );
}

export default DeleteNotebookModal;
