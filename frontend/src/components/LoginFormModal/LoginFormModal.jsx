import { useState } from "react";

import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/modal";
import { Navigate } from "react-router-dom";

import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  if (sessionUser) {
    return <Navigate to="/" replace={true} />;

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div>
      <div className="div-h1">
        <h1>Log In</h1>
      </div>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="div-input">
          <FontAwesomeIcon icon={faUser} className="formIcons" id="faUser" />
          <label htmlFor="username" id="labelUsername" className="formLabel">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="inputBox"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>

        <div className="div-input">
          <FontAwesomeIcon icon={faLock} className="formIcons" id="faLock" />
          <label htmlFor="password" id="labelPassword" className="formLabel">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="inputBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="div-button">
          {errors.credential && <p>{errors.credential}</p>}
          <button type="submit" className="submitButton">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;

{
  /* <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)} required/>
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Log In</button>
      </form> */
}
