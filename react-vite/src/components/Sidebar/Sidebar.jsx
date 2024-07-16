import ProfileButton from '../Navigation/ProfileButton'
import { Link } from 'react-router-dom'
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="side-bar-container">
                <ProfileButton className="profile-button" />
                <div className="user-profile"></div>
                <div className="search-bar">Search</div>
                <div>
                    <div>

                        <button className="button note">Note</button>
                    </div>
                    <div>
                        <button className="button task">Task</button>
                        <button className="button event">Event</button>
                    </div>
                </div>
                <div>
                    <button className="menu-button home">Home</button>
                    <button className="menu-button">Shortcuts</button>
                    <button className="menu-button">Notes</button>
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
