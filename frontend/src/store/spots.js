import { csrfFetch } from "./csrf";
import { useDispatch } from 'react-redux';

const SET_SPOTS = "spots/setSpots";

const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    payload: spots,
  }
};

export const getSpots = () => {
  return async (dispatch) => {  // Return a function that takes dispatch as an argument
    try {
      const response = await csrfFetch('/api/spots/');

      if (response.ok) {
        const data = await response.json();
        dispatch(setSpots(data.Spots));  // Dispatch the action with the fetched spots
        return data;
      } else {
        // Handle non-200 responses
        console.error('Failed to fetch spots:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch spots:', error);
    }
  };
};

const initialState = {
  spots: []
}

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS: 
      return {...state, spots: action.payload};
    default:
      return state;
  }
};

export default spotReducer;