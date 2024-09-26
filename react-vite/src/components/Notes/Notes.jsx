import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetCurrentUsersNotes } from '../../redux/notes';
import Sidebar from '../Sidebar';
import QuillEditor from '../QuillEditor';
import 'quill/dist/quill.snow.css';
import './Notes.css';
import Tags from '../Tags';
import { thunkRemoveTagFromNote } from '../../redux/tags';
import { thunkGetTagsForNote } from "../../redux/notes";
// import { removeTagFromNote } from '../../redux/notesSlice';
// import { setTagsByNoteId } from '../../redux/notesSlice';


function Notes(noteId, tagId) {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.userNotes);

    const [currentContent, setCurrentContent] = useState("")
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [title, setTitle] = useState("");
    const tagsByNoteId = useSelector(state => state.notes?.tagsByNoteId || {});
    const [noteUpdated, setNoteUpdated] = useState(false); // State to track note update



    // useEffect(() => {
    //     const fetchNotesAndTags = async () => {
            // await dispatch(thunkGetCurrentUsersNotes());

    //         // Fetch tags for all notes if not already present
    //         notes.forEach(note => {
    //             if (!tagsByNoteId[note.id]) {
    //                 dispatch(thunkGetTagsForNote(note.id));
    //             }
    //         });
    //     };
    //     fetchNotesAndTags();
    // }, [dispatch, noteUpdated, notes]);
    useEffect(() => {
        dispatch(thunkGetCurrentUsersNotes());
        console.log('Notes fetched from backend:', notes);
    }, [dispatch, notes]);

    useEffect(() => {
        if (notes.length > 0) {
            console.log('Notes found:', notes);
            notes.forEach(note => {
                console.log(`Fetching tags for note ID: ${note.id}`);
                dispatch(thunkGetTagsForNote(note.id));
            });
        }
    }, [dispatch, notes, noteUpdated]);


    const handleNoteClick = (noteId) => {
        console.log('Note clicked:', noteId);

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

    // const handleTagsUpdate = (noteId, tagId, updatedTags) => {

    //     const removedTag = tagsByNoteId[noteId]?.find(tag => !updatedTags.some(updatedTag => updatedTag.id === tag.id));

    //     // Dispatch the action to remove the tag from the backend
    //     if (removedTag) {
    //         dispatch(thunkRemoveTagFromNote(noteId, removedTag.id))
    //             .then(() => {
    //                 setNoteUpdated(prev => !prev);
    //             })
    //             .catch((error) => {
    //                 console.error("Error removing tag from backend:", error);
    //             });
    //     }
    // };
    console.log('Note ID:', noteId);
    console.log('Tag ID:', tagId);

    // const handleTagsUpdate = (noteId, tagId) => {
    //     console.log(`Removing tag with ID: ${tagId} from note with ID: ${noteId}`);
    //     const previousTags = [...(tagsByNoteId[noteId] || [])]; // Keep a copy of the original tags
    //     console.log('Previous tags:', previousTags);

    //     if (!tagId || !noteId) {
    //         console.error('Invalid note or tag ID');
    //         return;
    //     }

    //     // Optimistically remove tag locally
    //     dispatch(removeTagFromNote({ noteId, tagId }));

    //     // Confirm removal with backend
    //     dispatch(thunkRemoveTagFromNote(noteId, tagId))
    //         .then(() => {
    //             console.log(`Tag with ID: ${tagId} removed from note with ID: ${noteId}`);
    //             setNoteUpdated(prev => !prev);
    //         })
    //         .catch((error) => {
    //             console.error("Error removing tag from backend:", error);
    //             // Revert to the original state if the backend call fails
    //             dispatch(setTagsByNoteId({ noteId, tags: previousTags }));
    //         });
    // };
    const handleTagsUpdate = (noteId, tagId, updatedTags) => {
        console.log(`Updating tags for noteId ${noteId}, removing tagId ${tagId}`);

        const removedTag = tagsByNoteId[noteId]?.find(tag => !updatedTags.some(updatedTag => updatedTag.id === tag.id));

        // Dispatch the action to remove the tag from the backend
        if (removedTag) {
            dispatch(thunkRemoveTagFromNote(noteId, removedTag.id))
                .catch((error) => {
                    console.error("Error removing tag from backend:", error);
                });
        }
    };

    console.log('Tags by Note ID:', tagsByNoteId);

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
                                    <Tags
                                        tags={tagsByNoteId[note.id] || []}
                                        variant="default"
                                    />
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
                                onNoteUpdate={handleNoteUpdate}
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
