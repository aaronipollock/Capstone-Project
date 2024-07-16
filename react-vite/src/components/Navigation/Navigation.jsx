import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  console.log("Rendering Navigation compoent")
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
        <NavLink>
          <button className="nav-button download-button">Download</button>
        </NavLink>
      </div>
    </header>
  );
}

export default Navigation;
