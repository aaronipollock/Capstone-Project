import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { NavLink } from "react-router-dom";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="login-page">
        <i className="fas fa-sticky-note"></i>
        <h1 className="login-label">Log in</h1>
        <p className="sub-login-label">to continue to your Everclone account.</p>
        {errors.length > 0 &&
          errors.map((message) => <p key={message}>{message}</p>)}
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
          <button type="submit">Continue</button>
          <div className="signup-from-login">
            <p className="signup-from-login-text">Don&apos;t have an account?</p>
            <NavLink to="/signup" className="signup-link">Sign up</NavLink>
            <p className="signup-from-login-text">or</p>
            <NavLink to='/' className="signup-link">Log in as Demo User</NavLink>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormPage;
