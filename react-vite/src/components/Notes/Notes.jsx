import { useEffect, useState } from 'react';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetCurrentUsersNotes } from '../../redux/notes';
import Sidebar from '../Sidebar';
// import OpenModalButton from "../OpenModalButton";
// import UpdateNoteModal from "../UpdateNoteModal";
// import DeleteNoteModal from "../DeleteNoteModal"
import QuillEditor from '../QuillEditor';
import 'quill/dist/quill.snow.css';
import './Notes.css';
// import CreateNoteModal from '../CreateNoteModal';

function Notes() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.userNotes);
    // const [dropdownIndex, setDropdownIndex] = useState(null);
    const [currentContent, setCurrentContent] = useState("")
    const [selectedNoteId, setSelectedNoteId] = useState(null);


    useEffect(() => {
        dispatch(thunkGetCurrentUsersNotes());
    }, [dispatch]);

    // Only one dropdown open at a time
    //    const toggleDropdown = (index) => {
    //     setDropdownIndex(dropdownIndex === index ? null : index);
    // };

    // const closeDropdown = () => {
    //     setDropdownIndex(null);
    // }

    const handleNoteClick = (noteId) => {
        setSelectedNoteId(noteId);
    }

    // Detect clicks outside dropdown and close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-menu') && !event.target.closest('.note-action-button')) {
                // setDropdownIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // useEffect(() => {
    //     if (quillRef.current) return; // Do nothing if Quill is already initialized

    //     const quill = new Quill(editorRef.current, {
    //         theme: 'snow',
    //         modules: {
    //             toolbar: [
    //                 [{ header: '1' }, { header: '2' }, { font: [] }],
    //                 [{ list: 'ordered' }, { list: 'bullet' }],
    //                 ['bold', 'italic', 'underline'],
    //                 [{ color: [] }, { background: [] }],
    //                 [{ align: [] }],
    //                 ['clean']
    //             ]
    //         }
    //     })
    //     quillRef.current = quill;

    //     // Load content form local storage
    //     const content = localStorage.getItem('content');
    //     if (content) {
    //         quill.root.innerHTML = content;
    //     }

    //     // Save content on text change
    //     quill.on('text-change', () => {
    //         localStorage.setItem('content', quill.root.innerHTML);
    //     })
    // }, []);
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
                            {/* <div className='notes-dropdown'>
                                <button
                                    className='notes-action-button'
                                    onClick={() => toggleDropdown('notes')}
                                >
                                    <strong>...</strong>
                                </button>
                                <div className={`dropdown-menu ${dropdownIndex === 'note' ? 'active' : ''}`}></div>
                                    <div className="dropdown-item">
                                        {note && (
                                            <OpenModalButton
                                                className="details-note-button"
                                                buttonText="Add new note"
                                                modalComponent={<CreateNoteModal />}
                                                onButtonClick={closeDropdown}
                                            />
                                        )}
                                    </div>
                            </div> */}
                        </section>
                        <section className='notes-section3'>
                            {notes.map((note,
                                // index
                            ) => (
                                <div
                                    key={note.id}
                                    className={`note-container ${selectedNoteId === note.id ? 'selected' : ''}`}
                                    onClick={() => handleNoteClick(note.id)}
                                >
                                    <div className="note-item-title">{note.title}</div>
                                    <div className="note-item-content">{note.content}</div>
                                    <div className="note-item-action">
                                        {/* <button
                                        className="note-action-button"
                                        onClick={() => toggleDropdown(index)}
                                        >
                                        <strong>...</strong>
                                        </button>
                                        {/* <div className={`note-dropdown-menu ${dropdownIndex === index ? 'active' : ''}`}>
                                            <div className="note-dropdown-item">
                                                <OpenModalButton
                                                    className="edit-note-button"
                                                    buttonText="Edit"
                                                    modalComponent={<UpdateNoteModal noteId={note.id} />}
                                                />
                                                <OpenModalButton
                                                    className="delete-note-button"
                                                    buttonText="Delete"
                                                    modalComponent={<DeleteNoteModal noteId={note.id} />}
                                                />
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                    <div className="notes-editor-section">
                        {/* <div id="toolbar"> */}
                        {/* <select className="ql-header">
                                <option value="1"></option>
                                <option value="2"></option>
                                <option selected></option>
                            </select>
                            <button className="ql-bold"></button>
                            <button className="ql-italic"></button>
                            <button className="ql-underline"></button>
                            <button className="ql-strike"></button>
                            <select className="ql-color"></select>
                            <select className="ql-background"></select>
                            <button className="ql-clean"></button> */}
                        {/* </div> */}
                        <QuillEditor initialContent={currentContent} onChange={handleContentChange} />
                    </div>
                </div >
            </div >
        </>
    )
}

export default Notes;
