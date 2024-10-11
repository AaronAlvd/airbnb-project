import { csrfFetch } from "./csrf";

const SET_SPOTS = "spots/setSpots";

const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    payload: spots,
  }
};

export const getSpots = async () => { 
  const response = await csrfFetch('api/spots/');

  if (response.ok) {
    const data = await response.json();
    dispatch(setSpots(data.spots))
    return data;
  }
}

const initialState = {};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS: 
      return {...state, spots: action.payload};
    default:
      return state;
  }
};

export default spotReducer;