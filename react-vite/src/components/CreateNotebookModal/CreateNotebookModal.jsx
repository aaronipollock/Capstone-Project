import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { thunkCreateNewNotebook } from "../../redux/notebooks";
import './CreateNotebookModal.css'

function CreateNotebookModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const validateForm = () => {
        const newErrors = {};
        if (title.length < 2 || title.length > 50) newErrors.title = "Title must be between 2 and 50 characters."
        return newErrors;
    };

    const handleCreateClick = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {

            const serverResponse = await dispatch(
                thunkCreateNewNotebook({ title })
            );

            if (serverResponse.errors) {
                setErrors(serverResponse.errors);
            } else {
                closeModal();
                navigate('/notebooks');
            }
        } catch (error) {
            setErrors({ server: "Something went wrong. Please try again." })
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
        navigate(location.pathname)
    };

    return (
        <div className="create-notebook-modal-container">
            <p className="main-text">Create new folio</p>
            <p className="useful-text">Folios serve thee well to gather notes about a common matter. They may be kept in secret or shared amongst others.</p>
            <form className="create-notebook" onSubmit={handleCreateClick}>
                <label className="title-text">
                    Title
                    <div className="notebook-title-text">
                        <input
                            type="text"
                            value={title}
                            placeholder="Folio title"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
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
