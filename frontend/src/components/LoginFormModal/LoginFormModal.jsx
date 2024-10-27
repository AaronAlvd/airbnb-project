import { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/modal";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const { closeModal, isOpen } = useModal();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Reset state when the modal opens
  useEffect(() => {
    console.log(isOpen)
    if (isOpen) {
      console.log('isOpen', isOpen)
      setCredential("");
      setPassword("");
      setErrors({});
    }
  }, [isOpen]);

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

  const handleDemoSubmit = () => {
    const demoCredential = 'Demo-lition';
    const demoPassword = 'password';

    return dispatch(sessionActions.login({ credential: demoCredential, password: demoPassword }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="div-loginForm">
      <div className="div-h1">
        <h1 className="h1-login">Log In</h1>
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
            autoComplete="off" // Prevent autofill
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
            autoComplete="off" // Prevent autofill
          />
        </div>

        <div className="div-button">
          {errors.credential && <p className="login-displayErrors">{errors.credential}</p>}
          <button
            type="submit"
            className="submitButton"
            disabled={credential.length < 4 || password.length < 6}
          >
            Login
          </button>
        </div>
      </form>

      <button className="LF-demoButton" onClick={handleDemoSubmit} aria-label="Log in as demo user">
        Demo User
      </button>
    </div>
  );
}

export default LoginFormPage;
