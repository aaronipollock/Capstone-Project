import Sidebar from '../Sidebar/Sidebar'
import './UserPage.css'
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from "react-router-dom";
import { thunkGetCurrentUsersNotes } from '../../redux/notes';
import { useEffect, useState } from 'react';
import OpenModalButton from "../OpenModalButton";
import CreateNoteModal from "../CreateNoteModal";


function UserPage() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.userNotes);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [scratchPadContent, setScratchPadContent] = useState('');
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                await dispatch(thunkGetCurrentUsersNotes());
            } catch (error) {
                setErrors({ errors: 'Failed to fetch notes' });
                // Optionally set an error state and display an error message in the UI
            }
        };
        fetchNotes();
    }, [dispatch])

    const getRecentNotes = () => {
        if (!Array.isArray(notes) || notes.length === 0) return [];
        return [...notes].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 4);
    };

    // Only one dropdown open at a time
    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };

    const closeDropdown = () => {
        setDropdownIndex(null);
    }

    // Detect clicks outside dropdown and close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.scratch-pad-dropdown-menu') && !event.target.closest('.scratch-pad-action-button')) {
                setDropdownIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleScratchPadChange = (e) => {
        setScratchPadContent(e.target.value);
    }

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
                    <div className='home-page-section2-header'>
                        <div className='header-left'>
                            <span className='recent-notes-text'>Recent Notes</span>
                        </div>
                        <div className='header-right'>
                            <span className='scratch-pad-text'>Scratch Pad</span>
                            <button
                                className="scratch-pad-action-button"
                                onClick={() => toggleDropdown('scratch-pad')}
                            >
                                <strong>...</strong>
                            </button>
                            <div className={`scratch-pad-dropdown-menu ${dropdownIndex === 'scratch-pad' ? 'active' : ''}`}>
                                <div className="dropdown-item">
                                    {(
                                        <OpenModalButton
                                            className="convert-note-button"
                                            buttonText="Convert to note"
                                            modalComponent={<CreateNoteModal prepopulatedContent={scratchPadContent} />}
                                            onButtonClick={closeDropdown}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-page-notes-container">
                        {recentNotes.length === 0 ? (
                            <p>No recent notes available</p>
                        ) : (
                            recentNotes.map(note => (
                                <div key={note.id} className="home-page-note-card">
                                    <div className="home-page-note-card-text title">{note.title || 'Untitled'}</div>
                                    <div className="home-page-note-card-text content">{note.content || 'No content available'}</div>
                                </div>
                            ))
                        )}
                        <textarea
                            className="scratch-pad"
                            value={scratchPadContent}
                            onChange={handleScratchPadChange}
                        ></textarea>
                        {errors.errors && <p className="error-message">{errors.errors}</p>}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default UserPage
