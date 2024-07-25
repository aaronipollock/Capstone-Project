import Sidebar from '../Sidebar/Sidebar'
import './UserPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetCurrentUsersNotes } from '../../redux/notes';
import { useEffect } from 'react';

function UserPage() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.userNotes);

    useEffect(() => {
        dispatch(thunkGetCurrentUsersNotes());
    }, [dispatch])

    const getRecentNotes = () => {
        if (!notes) return [];
        return notes
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .slice(0, 4);
    };

    const recentNotes = getRecentNotes();

    return (
        <div className="user-page-wrapper">
            <Sidebar />
            <div className="user-page-container">
                <section className="home-page-section1">
                    <div>
                        <p className="ready">Ready to start taking notes?</p>
                        <h1 className="h1-user-page">Your Home</h1>
                    </div>
                </section>
                <section className='home-page-section2'>
                    <div>Recent Notes</div>
                    <div className="home-page-notes-container">
                        {recentNotes.map(note => (
                            <div key={note.id} className="home-page-note-card">
                                <div className="home-page-note-card-text title">{note.title || 'Untitled'}</div>
                                <div className="home-page-note-card-text content">{note.content}</div>
                            </div>
                        ))}
                        <textarea className="scratch-pad"></textarea>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default UserPage
