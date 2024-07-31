import { useEffect, useState } from 'react';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetCurrentUsersNotes } from '../../redux/notes';
import Sidebar from '../Sidebar';
import OpenModalButton from "../OpenModalButton";
import UpdateNoteModal from "../UpdateNoteModal";
import DeleteNoteModal from "../DeleteNoteModal"
import './Notes.css';

function Notes() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.userNotes);
    const [dropdownIndex, setDropdownIndex] = useState(null);

    useEffect(() => {
        dispatch(thunkGetCurrentUsersNotes());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-menu') && !event.target.closest('.note-action-button')) {
                setDropdownIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
                            {notes.map((note, index) => (
                                <div key={note.id} className="note-container">
                                    <div className="note-item-title">{note.title}</div>
                                    <div className="note-item-content">{note.content}</div>
                                    <div className="note-item-action">
                                        {/* <button
                                        className="note-action-button"
                                        onClick={() => toggleDropdown(index)}
                                    >
                                        <strong>...</strong>
                                    </button> */}
                                        <div className={`note-dropdown-menu ${dropdownIndex === index ? 'active' : ''}`}>
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
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                    <div className="notes-right">
                        <textarea className="notes-textarea"></textarea>
                    </div>
                </div >
            </div >
        </>
    )


}

export default Notes;
