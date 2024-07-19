import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkGetCurrentUsersNotebooks } from '../../redux/notebooks';
import { NavLink } from 'react-router-dom'
import Sidebar from '../Sidebar';
import OpenModalButton from "../OpenModalButton";
import CreateNotebookModal from '../CreateNotebookModal';
import UpdateNotebookModal from '../UpdateNotebookModal/UpdateNotebookModal';
import DeleteNotebookModal from '../DeleteNotebookModal';
// import NotesByNotebook from '../NotesByNotebooks/NotesByNotebook';
import './Notebooks.css';

function Notebooks() {
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebooks.userNotebooks);
    const [user, setUser] = useState(null);
    const [dropdownIndex, setDropdownIndex] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/users/current');
            const data = await response.json()
            setUser(data);
        }
        fetchUser();
        dispatch(thunkGetCurrentUsersNotebooks());
    }, [dispatch]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    //Only one dropdown open at a time
    const toggleDropdown = (index) => {
        // console.log(`Toggling dropdown for index: ${index}`);
        setDropdownIndex(dropdownIndex == index ? null : index);
    };

    //Detect clicks outside dropdown and close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-menu') && !event.target.closest('.action-button')) {
                // console.log('Clicked outside, closing dropdown')
                setDropdownIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    if (!notebooks.length) return <p>No notebooks available</p>;

    return (
        <>
            <div className="notebooks-page-container">
                <Sidebar />
                <div className="main-content">
                    <section className='section1'>
                        <p className="text-notebooks">Notebooks</p>
                    </section>
                    <section className='section2'>
                        <p># notebooks</p>
                        <OpenModalButton
                            className="new-notebook-button"
                            buttonText="New Notebook"
                            modalComponent={<CreateNotebookModal />}
                        />
                    </section>
                    <section className='section3'>
                        <p className="title-title">Title</p>
                        <p>Created by</p>
                        <p>Updated</p>
                        <p>Shared with</p>
                        <p>Actions</p>
                    </section>
                    <section className='section4'>
                        {notebooks.map((notebook, index) => (
                            <div key={notebook.id} className="notebook-container">
                                <NavLink to={`/notebooks/${notebook.id}`} className="title-link">
                                    <div className="notebook-item">{notebook.title}</div>
                                </NavLink>
                                <div className="notebook-item">{user ? user.email : 'Loading...'}</div>
                                <div className="notebook-item">{formatDate(notebook.updated_at)}</div>
                                <div className="notebook-item">—</div>
                                <div className="notebook-item">
                                    <button
                                        className="action-button"
                                        onClick={() => toggleDropdown(index)}
                                    >
                                        <strong>...</strong>
                                    </button>
                                    <div className={`dropdown-menu ${dropdownIndex === index ? 'active' : ''}`}>
                                        <div className="dropdown-item">
                                            <OpenModalButton
                                                className="retitle-notebook-button"
                                                buttonText="Retitle notebook"
                                                modalComponent={<UpdateNotebookModal notebookId={notebook.id} />}
                                            />
                                            <OpenModalButton
                                                className="delete-notebook-button"
                                                buttonText="Delete notebook"
                                                modalComponent={<DeleteNotebookModal notebookId={notebook.id} />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </>
    );
}


export default Notebooks;
