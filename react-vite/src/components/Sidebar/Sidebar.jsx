import ProfileButton from '../Navigation/ProfileButton'
import { Link } from 'react-router-dom'
import './Sidebar.css';
import OpenModalButton from '../OpenModalButton';
import CreateNotebookModal from '../CreateNotebookModal'
import CreateNoteModal from '../CreateNoteModal';
import TagsModal from '../TagsModal';
import { MdOutlineHome } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiTag } from "react-icons/fi";
import { PiNotebookBold } from "react-icons/pi";
import { useState } from 'react';



function Sidebar() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="side-bar-container">
            <ProfileButton className="profile-button" />
            <div className="user-profile"></div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <div>
                <OpenModalButton
                    className="button notebook"
                    buttonText="+Folio"
                    modalComponent={<CreateNotebookModal />}
                />
            </div>
            <div>
                <div>
                    <OpenModalButton
                        className="button note"
                        buttonText="+Note"
                        modalComponent={<CreateNoteModal />}
                    />
                </div>
            </div>
            <div className="sidebar-menu-buttons">
                <Link to="/users/current" className="link-menu-button">
                    <MdOutlineHome className="icon" />
                    <span>Home</span>
                </Link>
                <Link to="/notes" className="link-menu-button">
                    <HiOutlineDocumentText className='icon' />
                    <span>Notes</span>
                </Link>
                <Link to="/notebooks" className="link-menu-button">
                    <PiNotebookBold className="icon" />
                    <span>Folios</span>
                </Link>
                <div>
                    <OpenModalButton
                        className="tag-modal-button"
                        buttonText={(
                            <span>
                                <FiTag className="tag-sidebar-icon" />Marks
                            </span>
                        )}
                        modalComponent={<TagsModal />}
                    />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
