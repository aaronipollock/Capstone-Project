import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkUpdateNote } from "../../redux/notes";
import { thunkGetCurrentUsersNotes } from "../../redux/notes";
import './UpdateNoteModal.css'

function UpdateNoteModal({ noteId }) {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const note = useSelector((state) =>
        state.notes.userNotes.find((n) => n.id === noteId))
    const [title, setTitle] = useState(note ? note.title : "");
    const [content, setContent] = useState(note ? note.content : "")
    const [errors, setErrors] = useState({});
    const currentUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();

    const validateForm = () => {
        const newErrors = {};
        if (title.length < 2 || title.length > 50) newErrors.title = "Title must be between 2 and 50 characters."
        if (content.length < 2 || content.length > 2000) newErrors.content = "Content must be between 2 and 2000 characters."
        return newErrors;
    }

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    }

    const handleUpdateClick = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (!note) {
            setErrors({ note: "Note not found." });
            return;
        }

        if (note.user_id !== currentUser.id) {
            setErrors({ user: "You are not authorized." });
            return
        }

        const updatedNote = { ...note, title, content };

        try {
            const serverResponse = await dispatch(thunkUpdateNote(updatedNote));

            if (serverResponse.errors) {
                setErrors(serverResponse.errors);
            } else {
                dispatch(thunkGetCurrentUsersNotes());
                closeModal();
            }
        } catch (error) {
            console.error('Failed to update note:', error);
            setErrors({ server: "An error occurred while updating the note."});
        }
    };

    return (
        <div className="create-note-modal-container">
            <p className="note-main-text">Update your note</p>
            <form className="create-note" onSubmit={handleUpdateClick}>
                <label className="note-title-text">
                    Title
                    <div className="note-title-text">
                        <input
                            type="text"
                            value={title}
                            placeholder="Note title"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </label>
                {errors.title && <p className="error-message">{errors.title}</p>}
                <label className="note-text">
                    Content
                    <div className="note-content">
                        <textarea
                            value={content}
                            placeholder="Note content"
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                </label>
                {errors.content && <p className="error-message">{errors.content}</p>}
                <div className="note-button-container">
                    <button type='button' onClick={handleCancelClick} className="button cancel">
                        Cancel
                    </button>
                    <button type='submit' className="button create">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateNoteModal;
