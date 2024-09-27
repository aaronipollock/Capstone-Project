import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetCurrentUsersNotes } from '../../redux/notes';
import Sidebar from '../Sidebar';
import QuillEditor from '../QuillEditor';
import 'quill/dist/quill.snow.css';
import './Notes.css';
import Tags from '../Tags';
import { thunkDeleteTag, thunkRemoveTagFromNote } from '../../redux/tags';
import { thunkGetTagsForNote } from "../../redux/notes";
// import { removeTagFromNote } from '../../redux/notesSlice';
// import { setTagsByNoteId } from '../../redux/notesSlice';


function Notes(noteId) {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.userNotes);

    const [currentContent, setCurrentContent] = useState("")
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const [title, setTitle] = useState("");
    const tagsByNoteId = useSelector(state => state.notes?.tagsByNoteId || {});
    const [noteUpdated, setNoteUpdated] = useState(false); // State to track note update

    useEffect(() => {
        dispatch(thunkGetCurrentUsersNotes());
    }, [dispatch]);

    useEffect(() => {
        if (notes.length > 0) {
            notes.forEach(note => {
                dispatch(thunkGetTagsForNote(note.id));
            });
        }
    }, [dispatch, notes, noteUpdated]);


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

    const handleTagsUpdate = (noteId, tagId, updatedTags, removeFromAll = false) => {
        console.log(`Updating tags for noteId: ${noteId}, tagId: ${tagId}, removeFromAll: ${removeFromAll}`);

        // Ensure tagsByNoteId[noteId] exists and has tags
        const currentTags = tagsByNoteId[noteId] || [];
        console.log('Current tags for note:', currentTags);

        // Find the removed tag
        const removedTag = currentTags.find(tag => !updatedTags.some(updatedTag => updatedTag.id === tag.id));
        console.log('Removed tag:', removedTag);

        // Check if removedTag exists before proceeding
        if (removedTag) {
            if (removeFromAll) {
                console.log(`Attempting to remove tag with id ${removedTag.id} from all notes`);
                // If removeFromAll is true, remove the tag globally from all notes
                dispatch(thunkDeleteTag(removedTag.id))
                    .then(() => {
                        console.log(`Tag with id ${removedTag.id} removed from all notes`);
                        setNoteUpdated(prev => !prev); // Force re-render
                    })
                    .catch((error) => {
                        console.error("Error removing tag from all notes:", error);
                    });
            } else {
                console.log(`Attempting to remove tag with id ${removedTag.id} from note ${noteId}`);
                // Otherwise, remove the tag from the specific note
                dispatch(thunkRemoveTagFromNote(noteId, removedTag.id))
                    .then(() => {
                        console.log(`Tag with id ${removedTag.id} removed from note ${noteId}`);
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
                                        onRemoveTag={(tagId) => handleTagsUpdate(noteId, tagId, tagsByNoteId[note.id], false)}
                                        onDeleteTag={(tagId) => handleTagsUpdate(null, tagId, tagsByNoteId[note.id], true)}
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
