import ProfileButton from '../Navigation/ProfileButton'
import { Link } from 'react-router-dom'
import './Sidebar.css';
import OpenModalButton from '../OpenModalButton';
import CreateNotebookModal from '../CreateNotebookModal'
import CreateNoteModal from '../CreateNoteModal';

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
                <div>
                    <button className="button task">+Task</button>
                    <button className="button event">+Event</button>
                </div>
            </div>
            <div>
                <Link to="/users/current">
                    <button className="menu-button home">Home</button>
                </Link>
                <button className="menu-button">Shortcuts</button>
                <Link to="/notes">
                    <button className="menu-button">Notes</button>
                </Link>
                <button className="menu-button">Tasks</button>
                <Link to="/notebooks">
                    <button className="menu-button notebooks">Notebooks</button>
                </Link>
                <button className="menu-button">Tags</button>
                <button className="menu-button trash">Trash</button>
                <button className="menu-button upgrade"><strong>Upgrade</strong></button>
            </div>
        </div>
    )
}

export default Sidebar;
