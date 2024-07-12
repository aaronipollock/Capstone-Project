import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <header className="navigation">
      <div className="nav-left">
        <i className="fas fa-sticky-note nav-icon navigation-icon"></i>
        <NavLink to="/" className="nav-link">Everclone</NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/login">
          <button className="nav-button log-in-button">Log In</button>
        </NavLink>
        <NavLink >
          <button className="nav-button download-button">Download</button>
        </NavLink>
        {/* <ProfileButton /> */}
      </div>
    </header>
  );
}

export default Navigation;
