import ProfileButton from '../Navigation/ProfileButton'
import { Link } from 'react-router-dom'
import './Sidebar.css';
import OpenModalButton from '../OpenModalButton';
import CreateNotebookModal from '../CreateNotebookModal'
import CreateNoteModal from '../CreateNoteModal';
import TagsModal from '../TagsModal';
import { MdOutlineHome } from "react-icons/md";
// import { FaRegStar } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
// import { FaRegCheckCircle } from "react-icons/fa";
import { FiTag } from "react-icons/fi";
import { PiNotebookBold } from "react-icons/pi";



function Sidebar() {
    return (
        <div className="side-bar-container">
            <ProfileButton className="profile-button" />
            <div className="user-profile"></div>
            <div>
                <OpenModalButton
                    className="button notebook"
                    buttonText="+Notebook"
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
                {/* <div>
                    <button className="button task">+Task</button>
                    <button className="button event">+Event</button>
                </div> */}
            </div>
            <div className="sidebar-menu-buttons">
                <Link to="/users/current" className="link-menu-button">
                    <MdOutlineHome className="icon" />
                    {/* <button className="menu-button home">Home</button> */}
                    <span>Home</span>
                </Link>
                {/* <Link to="/users/current" className="link-menu-button">
                    <FaRegStar className="icon" />
                    <span>Shortcuts</span> */}
                {/* <button className="menu-button">Shortcuts</button> */}
                {/* </Link> */}
                <Link to="/notes" className="link-menu-button">
                    <HiOutlineDocumentText className='icon' />
                    <span>Notes</span>
                    {/* <button className="menu-button notes">Notes</button> */}
                </Link>
                {/* <Link to="/users/current" className="link-menu-button"> */}
                    {/* <FaRegCheckCircle className="icon" />
                    <span>Tasks</span> */}
                    {/* <button className="menu-button">Tasks</button> */}
                {/* </Link> */}
                <Link to="/notebooks" className="link-menu-button">
                    <PiNotebookBold className="icon" />
                    <span>Notebooks</span>
                    {/* <button className="menu-button notebooks">Notebooks</button> */}
                </Link>
                <div>
                    <OpenModalButton
                        className="tag-modal-button"
                        buttonText={(
                            <span>
                                <FiTag className="tag-sidebar-icon" /> Tags
                            </span>
                        )}
                        modalComponent={<TagsModal />}
                    />
                </div>
                {/* <Link to="/users/current" className="link-menu-button">
                    <FiTag className="icon" />
                    <span>Tags</span>
                </Link> */}
                {/* <button className="menu-button">Tags</button> */}
                {/* <button className="menu-button trash">Trash</button>
                {/* <button className="menu-button upgrade"><strong>Upgrade</strong></button> */}
            </div>
        </div>
    )
}

export default Sidebar;
