import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useCookies } from 'react-cookie';
import { useModal } from '../../context/modal';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['XSRF-Token']);
  const cookie = Object.values(cookies)[0]
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [isFocused, setIsFocused] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const { closeModal } = useModal();

  // Redirect if the user is already logged in
  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signUpUser({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const handleFocus = (e, name) => {
    e.stopPropagation();

    return setIsFocused({  
      firstName: false,
      lastName: false,
      username: false,
      email: false,
      password: false,
      confirmPassword: false, 
      [name]: true 
    })
  };

  const handleBlur = () => {
    return setIsFocused({
      firstName: false,
      lastName: false,
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    })
  };

  return (
    <div onClick={() => handleBlur()}>
      <div className="div-h1">
        <h1>Sign Up</h1>
      </div>
      <form className="registerForm" onSubmit={handleSubmit}>
        <div className="register-div-input" onClick={(e) => {handleFocus(e,'firstName')}}>
          <label className={isFocused.firstName ? "focusedLabel" : "register-formLabel"}>First Name</label>
          <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} 
                 className={isFocused.firstName ? "focused-inputBox" : "register-inputBox"} required />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>

        <div className="register-div-input" onClick={(e) => {handleFocus(e,'lastName')}}>
          <label className={isFocused.lastName ? "focusedLabel" : "register-formLabel"}>Last Name</label>
          <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} 
                 className={isFocused.lastName ? "focused-inputBox" : "register-inputBox"} required />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>

        <div className="register-div-input" onClick={(e) => {handleFocus(e,'username')}}>
          <label className={isFocused.username ? "focusedLabel" : "register-formLabel"}>Username</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} 
                 className={isFocused.username ? "focused-inputBox" : "register-inputBox"} required />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div className="register-div-input" onClick={(e) => {handleFocus(e,'email')}}>
          <label className={isFocused.email ? "focusedLabel" : "register-formLabel"}>Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} 
            className={isFocused.email ? "focused-inputBox" : "register-inputBox"} required />
          {errors.email && <p>{errors.email}</p>}
        </div>
        
        <div className="register-div-input" onClick={(e) => {handleFocus(e,'password')}}>
          <label className={isFocused.password ? "focusedLabel" : "register-formLabel"}>Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                 className={isFocused.password ? "focused-inputBox" : "register-inputBox"} required />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className="register-div-input" onClick={(e) => {handleFocus(e,'confirmPassword')}}>
          <label className={isFocused.confirmPassword ? "focusedLabel" : "register-formLabel"}>Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                 className={isFocused.confirmPassword ? "focused-inputBox" : "register-inputBox"} required />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        {errors.general && <p>{errors.general}</p>} {/* General error message */}

        <div className="div-submitButton">
          <button type="submit" disabled={loading} className="register-submitButton"> 
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;

 {/* <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
      {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}

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

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        {errors.general && <p>{errors.general}</p>}

        <button type="submit" disabled={loading}> 
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form> */}