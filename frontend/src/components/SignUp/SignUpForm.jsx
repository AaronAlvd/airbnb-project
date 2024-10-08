import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useCookies } from 'react-cookie';

function SignupFormPage() {
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

  // Redirect if the user is already logged in
  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors
    setLoading(true); // Set loading to true

    if (password === confirmPassword) {
      try {
        // console.log( cookie)
        await dispatch(
          sessionActions.signUpUser({
            email,
            username,
            firstName,
            lastName,
            password,
            csrfToken: cookie,
          })
        );
        // Reset form fields on successful signup
        setEmail("");
        setUsername("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
      } catch (res) {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: "An unexpected error occurred. Please try again." });
        }
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field",
      });
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
        {errors.general && <p>{errors.general}</p>} {/* General error message */}

        <button type="submit" disabled={loading}> {/* Disable button while loading */}
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </>
  );
}

export default SignupFormPage;
