import { useEffect, useState } from 'react';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetCurrentUsersNotes } from '../../redux/notes';
import Sidebar from '../Sidebar';
import OpenModalButton from "../OpenModalButton";
import UpdateNoteModal from "../UpdateNoteModal"
import './Notes.css';

function Notes() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.userNotes);
    // const [user, setUser] = useState(null)
    const [dropdownIndex, setDropdownIndex] = useState(null);

    useEffect(() => {
        // const fetchUser = async () => {
        //     const response = await fetch('/api/users/current');
        //     const data = await response.json()
        //     setUser(data);
        // }
        // fetchUser();
        dispatch(thunkGetCurrentUsersNotes());
    }, [dispatch]);

    // const formatDate = (dateString) => {
    //     const options = { year: 'numeric', month: 'long', day: "numeric" };
    //     return new Date(dateString).toLocaleDateString(undefined, options);
    // }

    //Only one dropdown open at a time
    // const toggleDropdown = (index) => {
    //     console.log(`Toggling dropdown for index: ${index}`);
    //     setDropdownIndex(dropdownIndex == index ? null : index);
    // };

    //Detect clicks outside dropdown and close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-menu') && !event.target.closest('.action-button')) {
                console.log('Clicked outside, closing dropdown')
                setDropdownIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    if (!notes.length) return <p>No notes available</p>;

    return (
        <>
            <div className="notes-page-container">
                <Sidebar />
                <div className="notes-main-content">
                    <section className='notes-section1'>
                        <p className="text-notes">Notes</p>
                    </section>
                    <section className="notes-section2">
                        <p># notes</p>
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
                                                buttonText="Edit note"
                                                modalComponent={<UpdateNoteModal noteId={note.id} />}
                                            />
                                            {/* <OpenModalButton
                                                className="delete-note-button"
                                                buttonText="Delete note"
                                                modalComponent={<DeleteNoteModal noteId={note.id} />}
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </div >
            </div >
        </>
    )


}

export default Notes;
