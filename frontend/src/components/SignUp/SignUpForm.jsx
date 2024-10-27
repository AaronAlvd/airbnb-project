import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
// import { useCookies } from 'react-cookie';
import { useModal } from '../../context/modal';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [disableSignup, setDisableSignup] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const refVariables = {
    firstName: firstNameRef,
    lastName: lastNameRef,
    username: usernameRef,
    email: emailRef,
    password: passwordRef,
    confirmPassword: confirmPasswordRef,
  }
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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

  useEffect(() => {
    let testFailed = false;

    if (formData.username.length < 4 || formData.username === "") {
      testFailed = true;
    }
    else if (formData.password.length < 6 || formData.password === "") {
      testFailed = true;
    }
    else if (formData.confirmPassword === "") {
      testFailed = true;
    }
    else if (formData.email === "") {
      testFailed = true;
    }
    else if (formData.firstName === "") {
      testFailed = true;
    }
    else if (formData.lastName === "") {
      testFailed = true;
    }

    setDisableSignup(testFailed);
  }, [formData]);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword, email, username, firstName, lastName } = formData;
    
    if(username.length < 4 ){
     return setErrors({username: "username must be longer than 4 characters"})
    }
    if(password.length < 6 ){
     return setErrors({password: "password must be longer than 4 characters"})
    }

    if (password === confirmPassword) {
      setErrors({});
      setLoading(true)
      return dispatch(
        sessionActions.signUpUser({
          email,
          username,
          firstName,
          lastName,
          password
        }))
        .then(() => {
          closeModal
          window.location.reload();
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors({
              general: data.errors
            });
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const handleChange = (e) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handleFocus = (e, name) => {
    e.stopPropagation();
    refVariables[name].current.focus();
    setIsFocused({...isFocused, [name]: true })
  };

  const handleBlur = () => {
    for (let name in isFocused) {
      if (formData[name] !== "") {
        setIsFocused(prev => ({...prev, [name]: true }));
      } else {
        setIsFocused(prev => ({...prev, [name]: false }));
      }
    }
  };

  return (
    <div>
      <div className="div-h1">
        <h1 className="h1-signup">Sign Up</h1>
      </div>
      <form className="registerForm" onSubmit={(e) => handleSubmit(e)}>
        <div className="register-div-input" tabIndex={0} onBlur={() => handleBlur()} onClick={(e) => {handleFocus(e, "firstName")}}>
          <label className={isFocused.firstName ? "focusedLabel" : "register-formLabel"}>First Name</label>
          <input ref={firstNameRef} type="text" id="firstName" name="firstName" value={formData.firstName} onChange={(e) => handleChange(e)}
                 className={isFocused.firstName? "focused-inputBox" : "register-inputBox"} required />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>

        <div className="register-div-input" tabIndex={0} onBlur={() => handleBlur()} onClick={(e) => {handleFocus(e, "lastName")}}>
          <label className={isFocused.lastName ? "focusedLabel" : "register-formLabel"}>Last Name</label>
          <input ref={lastNameRef} type="text" id="lastName" name="lastName" value={formData.lastName} onChange={(e) => handleChange(e)}
                 className={isFocused.lastName ? "focused-inputBox" : "register-inputBox"} required />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>

        <div className="register-div-input" tabIndex={0} onBlur={() => handleBlur()} onClick={(e) => {handleFocus(e, "username")}}>
          <label className={isFocused.username ? "focusedLabel" : "register-formLabel"}>Username</label>
          <input ref={usernameRef} type="text" id="username" name="username" value={formData.username} onChange={(e) => handleChange(e)}
                 className={isFocused.username ? "focused-inputBox" : "register-inputBox"} required />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div className="register-div-input" tabIndex={0} onBlur={() => handleBlur()} onClick={(e) => {handleFocus(e, "email")}}>
          <label className={isFocused.email ? "focusedLabel" : "register-formLabel"}>Email</label>
          <input ref={emailRef} type="email" id="email" name="email" value={formData.email} onChange={(e) => handleChange(e)}
            className={isFocused.email ? "focused-inputBox" : "register-inputBox"} required />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="register-div-input" tabIndex={0} onBlur={() => handleBlur()} onClick={(e) => {handleFocus(e, "password")}}>
          <label className={isFocused.password ? "focusedLabel" : "register-formLabel"}>Password</label>
          <input ref={passwordRef} type="password" id="password" name="password" value={formData.password} onChange={(e) => handleChange(e)}
                 className={isFocused.password ? "focused-inputBox" : "register-inputBox"} required />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className="register-div-input" tabIndex={0} onBlur={() => handleBlur()} onClick={(e) => {handleFocus(e, "confirmPassword")}}>
          <label className={isFocused.confirmPassword ? "focusedLabel" : "register-formLabel"}>Confirm Password</label>
          <input ref={confirmPasswordRef} type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={(e) => handleChange(e)}
                 className={isFocused.confirmPassword ? "focused-inputBox" : "register-inputBox"} required />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        {errors.general && <p>{errors.general}</p>} {/* General error message */}

        <div className="div-submitButton">
          <button type="submit" disabled={disableSignup} className="register-submitButton">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
