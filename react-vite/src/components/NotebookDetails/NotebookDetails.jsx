import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { thunkGetNotebookDetails } from "../../redux/notebooks";
import { thunkGetTagsForNote } from "../../redux/notes";
import Sidebar from "../Sidebar";
import OpenModalButton from "../OpenModalButton";
import CreateNoteModal from "../CreateNoteModal";
import UpdateNotebookModal from "../UpdateNotebookModal";
import DeleteNotebookModal from "../DeleteNotebookModal";
import QuillEditor from '../QuillEditor';
import 'quill/dist/quill.snow.css';
import './NotebookDetails.css';
import { useMemo } from 'react';

function NotebookDetails() {
    const { notebookId } = useParams();
    const dispatch = useDispatch();
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [currentContent, setCurrentContent] = useState("")
    const [title, setTitle] = useState("");
    const [noteUpdated, setNoteUpdated] = useState(false); // State to track note update

    const notebook = useSelector(state => state.notebooks.notebookDetails[notebookId]);
    const notes = useMemo(() => (notebook ? notebook.notes : []), [notebook]);
    const tagsByNoteId = useSelector(state => state.notes?.tagsByNoteId || {})

    useEffect(() => {
        const fetchNotebookDetails = async () => {
            try {
                await dispatch(thunkGetNotebookDetails(notebookId));

                if (notes.length > 0) {
                    notes.forEach(note => {
                        dispatch(thunkGetTagsForNote(note.id));
                    });
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotebookDetails();
    }, [dispatch, notebookId, noteUpdated, notes]);

    // Only one dropdown open at a time
    const toggleDropdown = (index) => {
        console.log('Toggling Dropdown:', index);
        setDropdownIndex(dropdownIndex === index ? null : index);
    };

    const closeDropdown = () => {
        setDropdownIndex(null);
    }

    // Detect clicks outside dropdown and close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.details-dropdown-menu') && !event.target.closest('.details-action-button')) {
                setDropdownIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleNoteClick = (noteId) => {
        const selectedNote = notes.find(note => note.id === noteId);
        if (selectedNote) {
            setSelectedNoteId(noteId);
            setCurrentContent(selectedNote.content || "");
            setTitle(selectedNote.title || "");
        }
    };

    const handleContentChange = (newContent) => {
        setCurrentContent(newContent);
    }

    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };

    const handleNoteUpdate = () => {
        setNoteUpdated(prev => !prev);
    }

    if (error) return <p>{error}</p>;
    if (!notebook) return <div className="blank-page"></div>;
    if (loading) return <div>Loading...</div>;

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
                        <div className={`details-dropdown-menu ${dropdownIndex === 'notebook' ? 'active' : ''}`}>
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
                    <ul>
                        {notes.map((note) => (
                            <div
                                key={note.id}
                                className={`details-container ${selectedNoteId === note.id ? 'selected' : ''}`}
                                onClick={() => handleNoteClick(note.id)}
                            >
                                <div className="details-item-title">{note.title}</div>
                                <div className="details-item-content">{note.content}</div>
                                <div className="details-item-tags">
                                    {tagsByNoteId[note.id] && tagsByNoteId[note.id].length > 0 ? (
                                        tagsByNoteId[note.id].map(tag => (
                                            <span key={tag.id} className="tag">{tag.tag_name}</span>
                                        ))
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </ul>
                </section>
            </div>
            <section className="details-editor-section">
                {selectedNoteId && (
                    <>
                        <QuillEditor
                            noteData={notes.find(note => note.id === selectedNoteId)}
                            initialContent={currentContent}
                            initialTitle={title}
                            onContentChange={handleContentChange}
                            onTitleChange={handleTitleChange}
                            tags={tagsByNoteId[selectedNoteId] || []}
                            onNoteUpdate={handleNoteUpdate}
                        />
                    </>
                )}
            </section>
        </div>
    );
}

export default NotebookDetails;
