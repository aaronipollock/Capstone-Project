import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <header className="navigation">
      <div className="nav-left">
        <i className="fas fa-sticky-note nav-icon navigation-icon"></i>
        <div className="nav-link">Note2be</div>
      </div>
      <div className="nav-right">
        <div>
          <NavLink to="/login">
            <button className="nav-button log-in-button">Log In</button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/signup">
            <button className="nav-button download-button">Sign Up</button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
