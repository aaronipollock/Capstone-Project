import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { thunkGetNotebookDetails } from "../../redux/notebooks";
import { thunkGetCurrentUsersNotes } from "../../redux/notes";
import Sidebar from "../Sidebar";
import OpenModalButton from "../OpenModalButton";
// import DeleteNotebookDetailModal from "../DeleteNotebookDetailModal";
import CreateNoteModal from "../CreateNoteModal";
// import DeleteNoteModal  from "../DeleteNoteModal";
import UpdateNotebookModal from "../UpdateNotebookModal";
import DeleteNotebookModal from "../DeleteNotebookModal";
import QuillEditor from '../QuillEditor';
import 'quill/dist/quill.snow.css';
import './NotebookDetails.css';

function NotebookDetails() {
    const { notebookId } = useParams();
    const dispatch = useDispatch();
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const notebook = useSelector(state => state.notebooks.notebookDetails[notebookId]);
    const [error, setError] = useState(null);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [currentContent, setCurrentContent] = useState("")

    useEffect(() => {
        console.log('NotebookID from useParams: ', notebookId);
        const fetchNotebookDetails = async () => {
            try {
                const response = await dispatch(thunkGetNotebookDetails(notebookId));
                console.log('Fetched Notebook Details:', response);
            } catch (err) {
                setError(err.message);
                console.error('Failed to fetch notebook details:', err);
            }
        };


        fetchNotebookDetails();
    }, [dispatch, notebookId]);

    useEffect(() => {
        console.log('NOTEBOOK FROM STATE: ', notebook, notebookId);
    }, [notebook, notebookId])

    useEffect(() => {
        if (!notebook || !notebook.notes) {
            dispatch(thunkGetCurrentUsersNotes());
        }
    }, [dispatch, notebook]);

    // Only one dropdown open at a time
    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };

    const closeDropdown = () => {
        setDropdownIndex(null);
    }

    const handleNoteClick = (noteId) => {
        setSelectedNoteId(noteId);
    }

    // Detect clicks outside dropdown and close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-menu') && !event.target.closest('.details-action-button')) {
                setDropdownIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleContentChange = (content) => {
        setCurrentContent(content);
        localStorage.setItem('content', content);
    }
    useEffect(() => {
        // Local content from local storage
        const content = localStorage.getItem('content');
        if (content) {
            setCurrentContent(content)
        }
    }, [])

    // const handleModalClose = () => {
    //     dispatch(thunkGetNotebookDetails(notebookId))
    // }

    if (error) return <p>{error}</p>;
    if (!notebook) return <div className="blank-page"></div>;

    const notes = notebook.notes;

    console.log('NOTEBOOK: ', notebook.title, notebookId)

    if (notes) {
        console.log('Notes:', notes);
    }

    return (
        <div className="details-page-container">
            <Sidebar />
            <div className="details-main-content">
                <section className='details-section1'>
                    <p className="text-details">{`${notebook.title}`}</p>
                </section>
                <section className="details-section2">
                    {!notes.length ? (
                        <p>No notes available</p>
                    ) : (
                        <>
                            {notes.length > 1 ? (
                                <p>{notes.length} notes</p>
                            ) : (
                                <p>1 note</p>
                            )}
                        </>
                    )}
                    <div className="details-dropdown">
                        <button
                            className="details-action-button"
                            onClick={() => toggleDropdown('notebook')}
                        >
                            <strong>...</strong>
                        </button>
                        <div className={`dropdown-menu ${dropdownIndex === 'notebook' ? 'active' : ''}`}>
                            <div className="dropdown-item">
                                {notebook && (
                                    <OpenModalButton
                                        className="details-add-note-button"
                                        buttonText="Add new note"
                                        modalComponent={<CreateNoteModal notebookId={notebookId} />}
                                        onButtonClick={closeDropdown}
                                    />
                                )}
                                {notebook && (
                                    <OpenModalButton
                                        className="details-rename-notebook-button"
                                        buttonText="Rename notebook"
                                        modalComponent={<UpdateNotebookModal notebookId={notebookId} />}
                                        onButtonClick={closeDropdown}
                                    />
                                )}
                                {notebook && (
                                    <OpenModalButton
                                        className="details-delete-notebook-button"
                                        buttonText="Delete notebook"
                                        modalComponent={<DeleteNotebookModal notebookId={notebookId} />}
                                        onButtonClick={closeDropdown}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <section className='details-section3'>
                    {notes ? (
                        <ul>
                            {notes.map((note, index) => (
                                <div
                                    key={note.id}
                                    className={`details-container ${selectedNoteId === note.id ? 'selected' : ''}`}
                                    onClick={() => handleNoteClick(note.id)}
                                >
                                    <div className="details-item-title">{note.title}</div>
                                    <div className="details-item-content">{note.content}</div>
                                    <div className="details-item-action">
                                        {/* <button
                                            className="details-action-button"
                                            onClick={() => toggleDropdown(index)}
                                        >
                                            <strong>...</strong>
                                        </button> */}
                                        <div className={`note-dropdown-menu ${dropdownIndex === index ? 'active' : ''}`}>
                                            {/* <div className="note-dropdown-item">
                                                <OpenModalButton
                                                    className="delete-details-button"
                                                    buttonText="Remove"
                                                    modalComponent={<DeleteNotebookDetailModal noteId={note.id} onClose={handleModalClose} />}
                                                />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-notes-text">No notes found in this notebook</p>
                    )}
                </section>
            </div>
            <div className="editor-section">
                <QuillEditor initialContent={currentContent} onChange={handleContentChange} />
            </div>
        </div>
    );
}

export default NotebookDetails;
