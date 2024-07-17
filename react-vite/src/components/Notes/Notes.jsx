import { useEffect } from 'react';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetCurrentUsersNotes } from '../../redux/notes';
import Sidebar from '../Sidebar';
import './Notes.css';

function Notes() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.userNotes);
    // const [user, setUser] = useState(null)

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
                        {notes.map((note) => (
                            <div key={note.id} className="note-container">
                                <div className="note-item">{note.title}</div>
                                <div className="note-item">{note.content}</div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </>
    )


}

export default Notes;
