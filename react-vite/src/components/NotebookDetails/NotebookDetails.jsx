import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { thunkGetNotebookDetails } from "../../redux/notebooks";
import Sidebar from "../Sidebar";
import OpenModalButton from "../OpenModalButton";
import UpdateNoteModal from "../UpdateNoteModal";
import DeleteNoteModal from "../DeleteNoteModal";
import './NotebookDetails.css';

function NotebookDetails() {
    const { notebookId } = useParams();
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notebooks.notebookDetails[notebookId]);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotebookDetails = async () => {
            try {
                const response = await dispatch(thunkGetNotebookDetails(notebookId));
                if (response.errors) {
                    throw new Error(response.errors);
                }
                console.log('Fetched Notebook Details:', response);
            } catch (err) {
                setError(err.message);
                console.error('Failed to fetch notebook details:', err);
            }
        };

        if (!notes) {
            fetchNotebookDetails();
        } else {
            console.log('Notebook already in state:', notes);
        }
    }, [dispatch, notebookId, notes]);

    // Only one dropdown open at a time
    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };

    // Detect clicks outside dropdown and close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-menu') && !event.target.closest('.action-button')) {
                setDropdownIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    console.log('Notes:', notes);
    if (notes) {
        console.log('Notes:', notes);
    }

    if (error) return <p>{error}</p>;
    if (!notes) return <p>Notebook not found</p>;

    return (
        <div className="details-page-container">
            <Sidebar />
            <div className="details-main-content">
                <section className='details-section1'>
                    <p className="text-details">{`Notebook ${notebookId} > Notes`}</p>
                </section>
                <section className="details-section2">
                    <p># notes</p>
                </section>
                <section className='details-section3'>
                    {notes.length > 0 ? (
                        <ul>
                            {notes.map((note, index) => (
                                <div key={note.id} className="details-container">
                                    <div className="details-item-title">{note.title}</div>
                                    <div className="details-item-content">{note.content}</div>
                                    <div className="details-item-action">
                                        <button
                                            className="note-action-button"
                                            onClick={() => toggleDropdown(index)}
                                        >
                                            <strong>...</strong>
                                        </button>
                                        <div className={`note-dropdown-menu ${dropdownIndex === index ? 'active' : ''}`}>
                                            <div className="note-dropdown-item">
                                                <OpenModalButton
                                                    className="edit-details-button"
                                                    buttonText="Edit"
                                                    modalComponent={<UpdateNoteModal noteId={note.id} />}
                                                />
                                                <OpenModalButton
                                                    className="delete-details-button"
                                                    buttonText="Delete"
                                                    modalComponent={<DeleteNoteModal noteId={note.id} />}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p>No notes found</p>
                    )}
                </section>
            </div>
        </div>
    );
}

export default NotebookDetails;
