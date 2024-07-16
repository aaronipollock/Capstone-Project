import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
// import CreateNotebook from "./CreateNotebook";
import { useNavigate } from "react-router-dom";
import { thunkCreateNewNotebook } from "../../redux/notebooks";
import './CreateNotebookModal.css'

function CreateNotebookModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const validateForm = () => {
        const newErrors = {};
        if (!title || title.length > 50) newErrors.title = "Title must be between 1 and 50 characters."
        return newErrors;
    };

    const handleCreateClick = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const serverResponse = await dispatch(
            thunkCreateNewNotebook({
                title,
            })
        );

        if (serverResponse.errors) {
            setErrors(serverResponse.errors);
        } else {
            closeModal();
            navigate('/notebooks');
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        navigate('/notebooks')
    };

    return (
        <div className="create-notebook-modal-container">
            <p className="main-text">Create new notebook</p>
            <p className="useful-text">Notebooks are useful for grouping notes around a common topic. They can be private or shared.</p>
            <form className="create-notebook" onSubmit={handleCreateClick}>
                <label className="title-text">
                    Title
                    <div className="notebook-title-text">
                        <input
                            type="text"
                            value={title}
                            placeholder="Notebook title"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </label>
                {errors.title && <p className="error-message">{errors.title}</p>}
                <div className="button-container">
                    <button type='button' onClick={handleCancelClick} className="button cancel">
                        Cancel
                    </button>
                    <button type='submit' className="button create">
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateNotebookModal
