import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupForm.css'

function SignupFormPage() {
  console.log("Rendering SignupFormPage component");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [first_name, setFirstName] = useState()
  const [last_name, setLastName] = useState()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Current session user:", sessionUser);
  }, [sessionUser]);

  // if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with", { email, username, password, confirmPassword });

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
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

    console.log("Server response:", serverResponse);

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="signup-page-left">
      <i className="fas fa-sticky-note signup-icon"></i>
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
              setFirstName(e.target.value)}}
            required
          />
        </label>
        {errors.first_name && <p>{errors.first_name}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={last_name}
            onChange={(e) => {
              setLastName(e.target.value)}}
            required
          />
        </label>
        {errors.last_name && <p>{errors.last_name}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => {
              console.log("Email changed to:", e.target.value);
              setEmail(e.target.value)}}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => {
              console.log("Username changed to:", e.target.value);
              setUsername(e.target.value)}}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => {
              console.log("Password changed to:", e.target.value);
              setPassword(e.target.value)}}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              console.log("Confirm Password changed to:", e.target.value);
              setConfirmPassword(e.target.value)}}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Continue</button>
        <div className="login-from-signup">
          <p className="login-from-signup-text">Already have an account?</p>
          <NavLink to="/login" className="login-link">Log in</NavLink>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
