import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetCurrentUsersNotes } from '../../redux/notes';
import { thunkGetTagsForNote } from "../../redux/notes";
import Sidebar from '../Sidebar';
import QuillEditor from '../QuillEditor';
import 'quill/dist/quill.snow.css';
import './Notes.css';

function Notes() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.userNotes);
    const tagsByNoteId = useSelector(state => state.notes?.tagsByNoteId || {});

    const [currentContent, setCurrentContent] = useState("")
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [title, setTitle] = useState("");
    const [localTagsByNoteId, setLocalTagsByNoteId] = useState(tagsByNoteId);


    useEffect(() => {
        dispatch(thunkGetCurrentUsersNotes());
    }, [dispatch]);

    const handleNoteClick = (noteId) => {
        const selectedNote = notes.find(note => note.id === noteId);
        if (selectedNote) {
            setSelectedNoteId(noteId);
            setCurrentContent(selectedNote.content || "");
            setTitle(selectedNote.title || "");

            console.log(`Fetching tags for noteId: ${noteId}`)
            dispatch(thunkGetTagsForNote(noteId)).then((tags) => {
                console.log(`Fetched tags for noteId: ${noteId}`, tags);
            });
        }
    };

    useEffect(() => {
        console.log("tagsByNoteId state updated:", tagsByNoteId);
    }, [tagsByNoteId]);

        // Update localTagsByNoteId when tagsByNoteId changes
    useEffect(() => {
        setLocalTagsByNoteId(tagsByNoteId);
    }, [tagsByNoteId]);

    const handleContentChange = (newContent) => {
        setCurrentContent(newContent);
    }

    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };

    useEffect(() => {
        if (selectedNoteId) {
            dispatch(thunkGetTagsForNote(selectedNoteId));
        }
    }, [selectedNoteId, dispatch]);

    // const handleTagsUpdate = (updatedTags) => {
    //     // Update the tags in tagsByNoteId for the currently selected note
    //     console.log(`Tags updated for noteId ${selectedNoteId}:`, updatedTags);
    //     tagsByNoteId[selectedNoteId] = updatedTags;
    // };
    const handleTagsUpdate = (updatedTags) => {
        setLocalTagsByNoteId((prev) => {
            const newState = {
                ...prev,
                [selectedNoteId]: updatedTags,
            };
            console.log("Updated localTagsByNoteId in Notes:", newState);
            return newState;
        });
    }

    // Log the tags being passed to QuillEditor whenever selectedNoteId or tagsByNoteId changes
    useEffect(() => {
        if (selectedNoteId) {
            console.log(`Passing tags to QuillEditor for noteId ${selectedNoteId}:`, tagsByNoteId[selectedNoteId]);
        }
    }, [selectedNoteId, tagsByNoteId]);

    // Log tagsByNoteId when updated
    useEffect(() => {
        if (tagsByNoteId[selectedNoteId]) {
            console.log(`tagsByNoteId updated for noteId ${selectedNoteId}:`, tagsByNoteId[selectedNoteId]);
        }
    }, [tagsByNoteId, selectedNoteId]);


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
                                        {note.tags && note.tags.length > 0 ? (
                                            note.tags.map(tag => (
                                                <span key={tag.id} className="tag">{tag.tag_name}</span>
                                            ))
                                        ) : (
                                            <p></p>
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
