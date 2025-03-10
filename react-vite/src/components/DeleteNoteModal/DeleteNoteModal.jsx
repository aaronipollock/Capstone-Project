import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteNote } from "../../redux/notes";
import './DeleteNoteModal.css'
import { useState } from "react";

function DeleteNoteModal({ noteId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const note = useSelector((state) =>
        state.notes.userNotes.find((n) => n.id === noteId))
    const [errors, setErrors] = useState({});
    const currentUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();



    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault();

        console.log("Deleting note with ID:", noteId);
        console.log("Note object:", note);

        if (!note) {
            setErrors({ notebook: "Note not found." });
            return;
        }

        if (note.user_id !== currentUser.id) {
            setErrors({ user: "You are not authorized." });
            return
        }

        const serverResponse = await dispatch(thunkDeleteNote(noteId));

        if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            closeModal();
            navigate('/notes');
        }
    };

    return (
        <form className="delete-modal-container" onSubmit={handleDeleteClick}>
            <div className="main-delete-text">Art thou certain thou wouldst foresake this note to oblivion?</div>
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
                    Foresake
                </button>
            </div>
        </form>
    );
}

export default DeleteNoteModal;
