import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useModal } from '../../context/modal';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModal();

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword, email, username, firstName, lastName } = formData;

    if (username.length < 4) {
      return setErrors({ username: "Username must be longer than 4 characters" });
    }
    if (password.length < 6) {
      return setErrors({ password: "Password must be longer than 6 characters" });
    }
    if (password !== confirmPassword) {
      return setErrors({ confirmPassword: "Confirm Password must match Password" });
    }

    setErrors({});
    setLoading(true);

    return dispatch(sessionActions.signUpUser({ email, username, firstName, lastName, password }))
      .then(() => {
        closeModal();
        window.location.reload();
      })
      .catch(async (res) => {

        const data = await res.json();
       console.log('data-errors',data.message)
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(errors)
  };

  const isFormValid = Object.values(formData).every((field) => field.trim() !== "");
  const isUsernameValid = formData.username.length >= 4;
  const isPasswordValid = formData.password.length >= 6; // Check for password length

  return (
    <div>
      <div className="div-h1">
        <h1 className="h1-signup">Sign Up</h1>
      </div>
      <form className="registerForm" onSubmit={handleSubmit}>
        {["firstName", "lastName", "username", "email", "password", "confirmPassword"].map((field, index) => (
          <div key={index} className="register-div-input">
            <input
              type={field.includes("password") ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="register-inputBox"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)} // Placeholder text
              required
            />
            {errors[field] && <p>{errors[field]}</p>}
          </div>
        ))}
        <div className="div-submitButton">
          <button type="submit" disabled={loading || !isFormValid || !isUsernameValid || !isPasswordValid} className="register-submitButton">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
