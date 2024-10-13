import { csrfFetch } from "./csrf";
// import { useDispatch } from 'react-redux';

const SET_SPOTS = "spots/setSpots";

const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    payload: spots,
  };
};

export const getSpots = () => {
  return async (dispatch) => {
    // Return a function that takes dispatch as an argument
    try {
      const response = await csrfFetch("/api/spots/");

      if (response.ok) {
        const data = await response.json();
        dispatch(setSpots(data.Spots)); // Dispatch the action with the fetched spots
        return data;
      } else {
        // Handle non-200 responses
        console.error("Failed to fetch spots:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch spots:", error);
    }
  };
};
export const makeReview = (batchReview) => async (dispatch) => {
  const { review, userId, spotId, stars } = batchReview;

  try {
    // Use csrfFetch to perform the signup request
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify({
        review,
        stars,
        userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // Dispatch the user data to the Redux store
      // dispatch(setUser(data.user));

      window.sessionStorage.setItem(
        "reviews",
        JSON.stringify({ review, userId, spotId, stars })
      );

      return response;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "create review failed");
    }
  } catch (error) {
    console.error("Network or other error:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

const initialState = {
  spots: [],
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.payload };
    default:
      return state;
  }
};

export default spotReducer;
