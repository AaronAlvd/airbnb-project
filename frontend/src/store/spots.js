import { csrfFetch } from "./csrf";
// import { useDispatch } from 'react-redux';

const SET_SPOTS = "spots/setSpots";
const ADD_SPOT = "spots/addSpot"
const DELETE_SPOT = "spots/deleteSpot";

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

export const createSpot = async (dispatch, data) => {
  try {
    const { address, lng , lat, city, state, country, description, price } = data;

    const response = await csrfFetch('/api/spots/', {
      method: 'POST',
      body: JSON.stringify({
        address,
        city,
        state,
        country,
        lat,
        lng,
        description,
        price
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Create spot failed.")
    }

    const newData = await response.json();

    dispatch()

  } catch(err) {

  }
}

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
  spots: [],
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.payload };
    case ADD_SPOT: 
      return {...state, ...spots, [action.payload.id]: action.payload}
    case DELETE_SPOT:
      // Filter out the spot with the given ID from state.spots
      const updatedSpots = state.spots.filter(spot => spot.id !== action.payload.spotId);
        
      // Return updated state with the filtered spots
      return {
        ...state,
        spots: updatedSpots,
      };
    default:
      return state;
  }
};

export default spotReducer;
