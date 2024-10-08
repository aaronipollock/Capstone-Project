import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkRemoveNoteFromNotebook } from "../../redux/notes";
import { thunkGetCurrentUsersNotes } from "../../redux/notes";
import { thunkGetNotebookDetails } from "../../redux/notebooks";
import './RemoveNoteModal.css'
import { useState, useEffect } from "react";

function RemoveNoteModal({ noteId, notebookId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();

    const notes = useSelector((state) => state.notes.userNotes);
    const notebook = useSelector(state => state.notebooks.notebookDetails[notebookId]);
    const note = notes?.find((n) => n.id === noteId) || notebook?.notes?.find(n => n.id === noteId);

    const [errors, setErrors] = useState({});
    console.log("Redux state.notes:", notes);

    useEffect(() => {
        if (!notes || notes.length === 0) {
            dispatch(thunkGetCurrentUsersNotes());
        }
        if (!notebook) {
            dispatch(thunkGetNotebookDetails(notebookId));
        }
    }, [dispatch, notes, notebook, notebookId]);

    console.log("NOTE:", note, "NOTE ID:", noteId);

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    }

    if (!note) {
        return <div>Loading...</div>;
    }


    const handleRemoveClick = async (e) => {
        e.preventDefault();
        try {

            if (!note) {
                setErrors({ notebook: "Note not found." });
                return;
            }

            if (note.user_id !== currentUser.id) {
                setErrors({ user: "You are not authorized." });
                return
            }

            const serverResponse = await dispatch(thunkRemoveNoteFromNotebook(notebookId, noteId));

            console.log("Server Response:", serverResponse);

            if (serverResponse?.errors) {
                setErrors(serverResponse.errors);
            } else {
                console.log("CLOSEMODAL")
                closeModal();

                await dispatch(thunkGetNotebookDetails(notebookId));

                navigate(`/notebooks/${notebookId}`);
            }
        } catch (error) {
            console.error("Error removing note:", error);
            setErrors({ server: "An unexpected error occurred" })
        }
    };

    return (
        <form className="remove-modal-container" onSubmit={handleRemoveClick}>
            <div className="main-remove-text">Are you sure you want to remove this note from your notebook?</div>
            {errors.notebook && <div className="error-text">{errors.notebook}</div>}
            {errors.user && <div className="error-text">{errors.user}</div>}
            {errors.server && <div className="error-text">{errors.server}</div>}
            <div className="remove-note-buttons">
                <button
                    type='button'
                    onClick={handleCancelClick}
                    className="cancel-remove-note-button"
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    className="confirm-remove-note-button"
                >
                    Remove
                </button>
            </div>
        </form>
    );
}

export default RemoveNoteModal;
