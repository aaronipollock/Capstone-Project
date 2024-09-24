import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetCurrentUsersNotes } from '../../redux/notes';
import { thunkGetTagsForNote } from "../../redux/notes";
import Sidebar from '../Sidebar';
import QuillEditor from '../QuillEditor';
import 'quill/dist/quill.snow.css';
import './Notes.css';
import { thunkRemoveTagFromNote } from '../../redux/tags';

function Notes() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.userNotes);
    const tagsByNoteId = useSelector(state => state.notes?.tagsByNoteId || {});

    const [currentContent, setCurrentContent] = useState("")
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [title, setTitle] = useState("");
    const [localTagsByNoteId, setLocalTagsByNoteId] = useState(tagsByNoteId);


    useEffect(() => {
        const fetchNotesAndTags = async () => {
            await dispatch(thunkGetCurrentUsersNotes());

            console.log("Fetched notes:", notes);
            // Fetch tags for all notes when the component is first loaded
            if (notes && notes.length > 0) {
                const tagPromises = notes.map(note => {
                    if (!tagsByNoteId[note.id]) {
                        return dispatch(thunkGetTagsForNote(note.id));
                    }
                    return null;
                });

                // Wait for all tag-fetching promises to complete
                await Promise.all(tagPromises);
            }
        };
        fetchNotesAndTags();
    }, [dispatch, notes, tagsByNoteId]);

    useEffect(() => {
        setLocalTagsByNoteId(tagsByNoteId);
        console.log('Syncing localTagsByNoteId with tagsByNoteId:', tagsByNoteId);
    }, [tagsByNoteId]);

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

    const handleTagsUpdate = (updatedTags) => {
        const removedTag = localTagsByNoteId[selectedNoteId]?.find(tag => !updatedTags.some(updatedTag => updatedTag.id === tag.id));

        // Optimistically update local state
        setLocalTagsByNoteId((prev) => ({
            ...prev,
            [selectedNoteId]: updatedTags,
        }));

        // Dispatch the action to remove the tag from the backend
        if (removedTag && removedTag.id) {
            dispatch(thunkRemoveTagFromNote(selectedNoteId, removedTag.id))
                .then(() => {
                    console.log(`Tag successfully removed from noteId ${selectedNoteId}:`, removedTag.id);
                })
                .catch((error) => {
                    console.error("Error removing tag from backend:", error);
                    // Optionally, you can revert the optimistic update here if needed.
                });
        }
    };


    return (
        <>
            <div className="notes-page-container">
                <Sidebar />
                <div className="notes-main-content">
                    <div className="notes-left">
                        <section className='notes-section1'>
                            <p className="text-notes">Notes</p>
                        </section>
                        <section className="notes-section2">
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
                        </section>
                        <section className='notes-section3'>
                            {notes.map(note => (
                                <div
                                    key={note.id}
                                    className={`note-container ${selectedNoteId === note.id ? 'selected' : ''}`}
                                    onClick={() => handleNoteClick(note.id)}
                                >
                                    <div className="note-item-title">{note.title}</div>
                                    <div className="note-item-content">{note.content}</div>
                                    <div className="note-item-tags">
                                        {localTagsByNoteId[note.id] && localTagsByNoteId[note.id].length > 0 ? (
                                            localTagsByNoteId[note.id].map(tag => (
                                                <span key={tag.id} className="tag">{tag.tag_name}</span>
                                            ))
                                        ) : (
                                            <p>No tags available</p>
                                        )}
                                        {console.log(`Rendering tags for note ${note.id}:`, localTagsByNoteId[note.id])}
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                    <div className="notes-editor-section">
                        {selectedNoteId && (
                            <QuillEditor
                                noteData={notes.find(note => note.id === selectedNoteId)}
                                initialContent={currentContent}
                                initialTitle={title}
                                onContentChange={handleContentChange}
                                onTitleChange={handleTitleChange}
                                tags={tagsByNoteId[selectedNoteId] || []}
                                onTagsUpdate={handleTagsUpdate}
                            />
                        )}
                    </div>
                </div >
            </div >
        </>
    )
}

export default Notes;
