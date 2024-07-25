import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupFormPage.css'
import { FaStickyNote } from "react-icons/fa";
import { FaShapes, FaHeart, FaHourglass } from "react-icons/fa";
import { IoBusiness } from "react-icons/io5";
import { IoMdSchool } from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";



function SignupFormPage() {
  console.log("Rendering SignupFormPage component");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const sessionUser = useSelector((state) => state.session.user);
  const [first_name, setFirstName] = useState()
  const [last_name, setLastName] = useState()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (password !== confirmPassword) newErrors.confirmPassword = "Confirm Password field must be the same as the Password field."
    if (password.length < 8 || password.length > 20) newErrors.password = "Password must be bewtween 8 and 20 charachters."
    if (!email.includes('@')) newErrors.email = "Please provide a valid email address."
    if (username.length < 2 || username.length > 20) newErrors.username = "Username must be between 2 and 20 characters."
    if (first_name.length < 2 || first_name.length > 20) newErrors.first_name = "First name must be between 2 and 20 characters."
    if (last_name.length < 2 || last_name.length > 20) newErrors.last_name = "Last name must be between 2 and 20 characters."

    return newErrors;
  }

  // if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name,
        last_name,
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/users/current");
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-page-left">
        <FaStickyNote className="signup-sticky-note-icon" />
        <h1 className="signup-label">Welcome to Everclone!</h1>
        <p className="sub-signup-label">Sign up and start taking notes.</p>
        {errors.server && <p>{errors.server}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            First Name
            <input
              type="text"
              value={first_name}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              required
            />
          </label>
          {errors.first_name && <p className="error-message">{errors.first_name}</p>}
          <label>
            Last Name
            <input
              type="text"
              value={last_name}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              required
            />
          </label>
          {errors.last_name && <p className="error-message">{errors.last_name}</p>}
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => {
                console.log("Email changed to:", e.target.value);
                setEmail(e.target.value)
              }}
              required
            />
          </label>
          {errors.email && <p className="error-message">{errors.email}</p>}
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => {
                console.log("Username changed to:", e.target.value);
                setUsername(e.target.value)
              }}
              required
            />
          </label>
          {errors.username && <p className="error-message">{errors.username}</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => {
                console.log("Password changed to:", e.target.value);
                setPassword(e.target.value)
              }}
              required
            />
          </label>
          {errors.password && <p className="error-message">{errors.password}</p>}
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                console.log("Confirm Password changed to:", e.target.value);
                setConfirmPassword(e.target.value)
              }}
              required
            />
          </label>
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          <button type="submit">Continue</button>
          <div className="login-from-signup">
            <p className="login-from-signup-text">Already have an account?</p>
            <NavLink to="/login" className="login-link">Log in</NavLink>
          </div>
        </form>
      </div>
      <div className="signup-page-right">
        <div className="top-icons">
          <FaShapes className="shapes-icon" />
          <FaHourglass className="hourglass-icon" />
          <IoBusiness className="business-icon" />
        </div>
        <div className="signup-page-right-text1">Work. School. Life.</div>
        <div className="signup-page-right-text2">Remember everything</div>
        <div className="bottom-icons">
          <FaHeart className="heart-icon" />
          <IoMdSchool className="school-icon" />
          <IoIosChatbubbles className="chat-icon" />
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
