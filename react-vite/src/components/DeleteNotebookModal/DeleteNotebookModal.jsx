import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetNotebookDetails, thunkDeleteNotebook } from "../../redux/notebooks";
import { useModal } from "../../context/Modal";
import './DeleteNotebookModal.css'

function DeleteNotebookModal({ notebookId }) {
    const dispatch = useDispatch();
    const notebook = useSelector(state => state.notebooks.notesByNotebookId[notebookId]);
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
            <p>Art thou certain thou wouldst expunge the folio: <i>{notebook.title}</i>?</p>
            <p>All notes within the folio shall be expunged likewise. This deed cannot be undone.</p>
            {error && <p className="error-message">{error}</p>}
            <div className="delete-notebook-buttons">
                <button onClick={closeModal} className="cancel-delete-notebook-button">Cancel</button>
                <button onClick={handleDeleteClick} className="confirm-delete-notebook-button">Expunge</button>
            </div>
        </div>
    );
}

export default DeleteNotebookModal;
