import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { thunkCreateNewNote } from "../../redux/notes";
import './CreateNoteModal.css'

function CreateNoteModal({ notebookId, prepopulatedContent }) {
    console.log("Notebook ID in CreateNoteModal:", notebookId);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal();
    const [padContent, setPadContent] = useState(prepopulatedContent);

    const validateForm = () => {
        const newErrors = {};
        if (title.length < 2 || title.length > 50) newErrors.title = "Title must be between 2 and 50 characters."
        if (content.length < 2 || content.length > 800) newErrors.content = "Content must be between 2 and 800 characters."
        return newErrors;
    }

    const handleContentChange = (e) => {
        setPadContent(e.target.value);
    };

    const handleCreateClick = async (e) => {
        e.preventDefault();

        console.log("Creating note with notebookId:", notebookId);


        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const serverResponse = await dispatch(
            thunkCreateNewNote({
                title,
                content,
                notebookId,
            })
        );
        console.log("Server response: ", serverResponse)

        if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            closeModal();
            navigate('/notes');
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        navigate('/notes')
    };

    return (
        <div className="create-note-modal-container">
            <p className="note-main-text">Create new note</p>
            <form className="create-note" onSubmit={handleCreateClick}>
                <label className="note-title-text">
                    Title
                    <div className="note-title-text">
                        <input
                            type="text"
                            value={title}
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
                            value={content || padContent}
                            onChange={(e) => setContent(e.target.value) || handleContentChange}
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
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateNoteModal;
