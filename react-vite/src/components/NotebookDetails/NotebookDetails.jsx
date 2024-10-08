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
import Tags from '../Tags'
import { thunkDeleteTag, thunkRemoveTagFromNote } from '../../redux/tags';
import DeleteNoteModal from '../DeleteNoteModal';
import RemoveNoteModal from "../RemoveNoteModal";

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
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotebookDetails();
    }, [dispatch, notebookId])

    useEffect(() => {
        if (notebook?.notes?.length > 0) {
            notebook.notes.forEach(note => {
                dispatch(thunkGetTagsForNote(note.id));
            });
        }
    }, [dispatch, notebook?.notes]);
    
    const sortedNotes = useMemo(() => {
        if (!notebook || !notebook.notes) return [];
        return [...notebook.notes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }, [notebook]);

    // Only one dropdown open at a time
    const toggleDropdown = (index) => {
        console.log("Toggling dropdown, current index:", dropdownIndex);
        setDropdownIndex(dropdownIndex === index ? null : index);
    };

    const closeDropdown = () => {
        setDropdownIndex(null);
    }

    // Detect clicks outside dropdown and close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !event.target.closest('.details-dropdown-menu') &&
                !event.target.closest('.details-action-button') &&
                !event.target.closest('.detail-dropdown-menu') &&
                !event.target.closest('.detail-action-button')
            ) {
                setDropdownIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleNoteClick = (noteId) => {
        const selectedNote = sortedNotes.find(note => note.id === noteId);
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

    const handleTagsUpdate = (noteId, tagId, updatedTags, removeFromAll = false) => {

        // Ensure tagsByNoteId[noteId] exists and has tags
        const currentTags = tagsByNoteId[noteId] || [];

        // Find the removed tag
        const removedTag = currentTags.find(tag => !updatedTags.some(updatedTag => updatedTag.id === tag.id));

        // Check if removedTag exists before proceeding
        if (removedTag) {
            if (removeFromAll) {
                // If removeFromAll is true, remove the tag globally from all notes
                dispatch(thunkDeleteTag(removedTag.id))
                    .then(() => {
                        setNoteUpdated(prev => !prev); // Force re-render
                    })
                    .catch((error) => {
                        console.error("Error removing tag from all notes:", error);
                    });
            } else {
                // Otherwise, remove the tag from the specific note
                dispatch(thunkRemoveTagFromNote(noteId, removedTag.id))
                    .then(() => {
                        setNoteUpdated(prev => !prev); // Force re-render
                        dispatch(thunkGetTagsForNote(noteId)); // Refresh tags for the note
                    })
                    .catch((error) => {
                        console.error("Error removing tag from note:", error);
                    });
            }
        } else {
            console.error('No tag found to remove.');
        }
    };

    if (loading) return <div>Loading...</div>;

    if (!notebook || !notebookId) {
        return <div>Loading or missing data...</div>;
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
                        <div className={`details-dropdown-menu ${dropdownIndex === 'notebook' ? 'active' : ''}`}>
                            <div className="details-dropdown-item">
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
                                <Tags
                                    tags={tagsByNoteId[note.id] || []}
                                    variant="default"
                                />
                                {selectedNoteId === note.id && (
                                        <div className="detail-dropdown">
                                            <button
                                                className="detail-action-button"
                                                onClick={() => toggleDropdown(note.id)}
                                            >
                                                <strong>...</strong>
                                            </button>
                                            {dropdownIndex === note.id && (
                                                <div className="detail-dropdown-menu active">
                                                    {console.log("Dropdown is visible for note:", note.id)}
                                                    <div className="detail-dropdown-item">
                                                        {note && (
                                                            <OpenModalButton
                                                                className="remove-note-button"
                                                                buttonText="Remove note from notebook"
                                                                modalComponent={<RemoveNoteModal noteId={note.id} notebookId={notebookId} />}
                                                                onButtonClick={closeDropdown}
                                                            />
                                                        )}

                                                        {note && (
                                                            <OpenModalButton
                                                                className="delete-note-button"
                                                                buttonText="Delete note"
                                                                modalComponent={<DeleteNoteModal noteId={note.id} />}
                                                                onButtonClick={closeDropdown}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </ul>
                </section>
            </div>
            <section className="details-editor-section">
                <QuillEditor
                    noteData={notes.find(note => note.id === selectedNoteId)}
                    initialContent={selectedNoteId ? currentContent : ""}
                    initialTitle={selectedNoteId ? title : ""}
                    onContentChange={handleContentChange}
                    onTitleChange={handleTitleChange}
                    tags={tagsByNoteId[selectedNoteId] || []}
                    onNoteUpdate={handleNoteUpdate}
                    onTagsUpdate={handleTagsUpdate}
                />
            </section>
        </div>
    );
}

export default NotebookDetails;
