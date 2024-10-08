
// import { setTokenCookie } from "../../../backend/utils/auth";
import { csrfFetch } from "./csrf";




const SIGN_UP = "session/setUser";
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};



export const signUpUser = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;

  try {
    // Use csrfFetch to perform the signup request
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      // Dispatch the user data to the Redux store
      dispatch(setUser(data.user));

      // Store minimal user info in session storage
      window.sessionStorage.setItem(
        "users",
        JSON.stringify({ username, firstName, lastName, email })
      );

      return response;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Sign-up failed");
    }
  } catch (error) {
    console.error("Network or other error:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
};






// const removeUser = () => {
//   return {
//     type: REMOVE_USER
//   };
// };

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => {
  return async (dispatch) => {
    {
      const response = await csrfFetch("/api/session");
      const data = await response.json();
      dispatch(setUser(data.user));
      return response;
    }
  };
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SIGN_UP:
      return { ...state, user: action.payload, token: action.token };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
