import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkUpdateNotebooks } from "../../redux/notebooks";
import { thunkGetCurrentUsersNotebooks } from "../../redux/notebooks";
import './UpdateNotebookModal.css'

function UpdateNotebookModal({ notebookId }) {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const notebook = useSelector((state) =>
        state.notebooks.userNotebooks.find((nb) => nb.id === notebookId))
    const [title, setTitle] = useState(notebook ? notebook.title : "");
    const [errors, setErrors] = useState({});
    const currentUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();

    useEffect(() => {
        if (notebook) {
            setTitle(notebook.title);
        }
    }, [notebook]);

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    }

    const handleContinueClick = async (e) => {
        e.preventDefault();

        if (!notebook) {
            setErrors({ notebook: "Notebook not found." });
            return;
        }

        if (notebook.user_id !== currentUser.id) {
            setErrors({ user: "You are not authorized." });
            return
        }

        const updatedNotebook = { ...notebook, title };

        try {
            const serverResponse = await dispatch(thunkUpdateNotebooks(updatedNotebook));

            if (serverResponse.errors) {
                setErrors(serverResponse.errors);
            } else {
                dispatch(thunkGetCurrentUsersNotebooks());
                closeModal();
            }
        } catch (error) {
            console.error('Failed to update notebook:', error);
            setErrors({ server: "An error occurred while updating the notebook."});
        }
    };

    return (
        <form className="update-notebook-modal-container" onSubmit={handleContinueClick}>
            <div className="main-update-text">Retitle notebook</div>
            {errors.notebook && <div className="update-error-text">{errors.notebook}</div>}
            {errors.user && <div className="update-error-text">{errors.user}</div>}
            <label className="update-title-text">
                Title
                <div className="update-notebook-title-text">
                    <input
                        type="text"
                        value={title}
                        placeholder=""
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
            </label>
            {errors.title && <p className="update-error-message">{errors.title}</p>}
            <div className="update-button-container">
                <button type='button' onClick={handleCancelClick} className="update-cancel-button">
                    Cancel
                </button>
                <button type='submit' className="update-continue-button">
                    Continue
                </button>
            </div>
        </form>
    )
}


export default UpdateNotebookModal;
