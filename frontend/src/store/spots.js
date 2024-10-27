import { csrfFetch } from "./csrf";
// import { useDispatch } from 'react-redux';

const SET_SPOTS = "spots/setSpots";
const ADD_SPOT = "spots/addSpot"
const DELETE_SPOT = "spots/deleteSpot";
const SET_SPOT = "spots/setSpot";
const SET_SPOT_REVIEWS = "spots/setSpot/reviews";


const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    payload: spots,
  };
};

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot
  }
}

const setSpot = (spot) => {
  return {
    type: SET_SPOT,
    payload: spot
  }
}
const setSpotReviews = (reviews) => {
  return {
    type: SET_SPOT_REVIEWS,
    payload: reviews
  }
}
export const getSpots = () => {
  return async (dispatch) => {
    // Return a function that takes dispatch as an argument
    try {
      const response = await csrfFetch("/api/spots/");

      if (response.ok) {
        const data = await response.json();
        console.log('from get spots action', data)
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
export const getSingleSpot = (spotId) => {
  return async (dispatch) => {
    // Return a function that takes dispatch as an argument
    try {
      const response = await csrfFetch(`/api/spots/${spotId}`);

      if (response.ok) {
        const data = await response.json();
        dispatch(setSpot(data)); // Dispatch the action with the fetched spots
        const reviewsResponse = await csrfFetch(`/api/spots/${spotId}/reviews`)

        const reviewsData = await reviewsResponse.json()
        console.log('reviewsData',reviewsData)
        dispatch(setSpotReviews(reviewsData.Reviews))
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

export const createSpot = (data) => async (dispatch) => {
  try {
    const { address, lng, lat, city, state, country, description, price, name, imageUrl } = data;

    // First, create the Spot
    const response = await csrfFetch('/api/spots/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        city,
        state,
        country,
        name,
        lat,
        lng,
        description,
        price
        
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create a spot.");
    }

    const newSpot = await response.json();
    dispatch(addSpot(newSpot));

    // If an image URL was provided, create the SpotImage
    if (imageUrl) {
      const imageResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: imageUrl,
          preview: true,
        }),
      });

      if (!imageResponse.ok) {
        throw new Error("Failed to add image to spot.");
      }

      // const newImage = await imageResponse.json();
      // Optionally, add this image to the Redux store if needed
    }

    return newSpot;
  } catch (err) {
    console.error("Error creating spot:", err);
    return err;
  }
};


export const deleteSpot = async (spotId) => {
  try {
    // Send DELETE request to server
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
    });

    // Check if the response indicates success
    if (!response.ok) {
      // If response is not ok, throw an error
      const errorMessage = `Failed to delete spot with ID ${spotId}.`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // If deletion was successful, you might want to return something or perform another action
    console.log(JSON.stringify(data))
    return true; // For example, returning true to indicate success
  } catch (err) {
    // Handle errors here, such as logging or displaying an error message
    console.error('Error deleting spot:', err.message);
    // You can re-throw the error if needed
    throw err; // Optional: re-throwing the error to propagate it further
  }
};

const initialState = {
  spot: null,
  spots: [],
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.payload };

    case ADD_SPOT: {
      const newState = { ...state };
      newState.spots[action.payload.id] = action.payload;
      return newState;
    }

    case DELETE_SPOT: {
      // Filter out the spot with the given ID from state.spots
      const updatedSpots = state.spots.filter((spot) => spot.id !== action.payload.spotId);

      // Return updated state with the filtered spots
      return {
        ...state,
        spots: updatedSpots,
      };
    }

    case SET_SPOT:
      return { ...state, spot: action.payload || {} };

    case SET_SPOT_REVIEWS: {
      const sortedReviews = action.payload.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log('sortedReview', sortedReviews);
      return { ...state, spot: { ...state.spot, Reviews: sortedReviews } };
    }

    default:
      return state;
  }
};


export default spotReducer;
