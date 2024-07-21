import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateNoteId, thunkGetCurrentUsersNotes } from "../../redux/notes";
import './DeleteNotebookDetailModal.css';
import { useEffect, useState } from 'react';

function DeleteNotebookDetailModal({ noteId, onClose }) {
    const dispatch = useDispatch();
    const note = useSelector((state) => state.notes.userNotes.find((n) => n.id === noteId));
    const [errors, setErrors] = useState({});
    const currentUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();

    useEffect(() => {
        if (!note && !errors.notebook) {
            dispatch(thunkGetCurrentUsersNotes());
        }
    }, [dispatch, note, errors.notebook]);

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    };

    const handleRemoveClick = async (e) => {
        e.preventDefault();

        if (!note) {
            setErrors({ notebook: "Note not found." });
            return;
        }

        if (note.user_id !== currentUser.id) {
            setErrors({ user: "You are not authorized." });
            return;
        }

        const serverResponse = await dispatch(thunkUpdateNoteId(noteId, null));

        if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            closeModal();
            onClose();
        }
    }

    return (
        <form className="remove-modal-container" onSubmit={handleRemoveClick}>
            <div className="main-remove-text">Remove note?</div>
            <div className="add-remove-text">Your note will still exist but it will no longer be associated with this notebook.</div>
            {errors.notebook && <div className="error-text">{errors.notebook}</div>}
            {errors.user && <div className="error-text">{errors.user}</div>}
            <div className="remove-buttons">
                <button
                    type='button'
                    onClick={handleCancelClick}
                    className="cancel-remove-button"
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    className="confirm-remove-button"
                >
                    Remove
                </button>
            </div>
        </form>
    );
}


export default DeleteNotebookDetailModal;
