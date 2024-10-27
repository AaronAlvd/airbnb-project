// import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'bookings/GET_BOOKINGS'

const setBooking = (bookings) => {
  return {
    type: GET_BOOKINGS,
    payload: bookings
  }
}

export const getBookings = () => {
  return async (dispatch) => {
    try {
      const response = await csrfFetch('/api/bookings/current/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      dispatch(setBooking(data.Bookings));  // Make sure setBooking is defined to handle this payload
    } catch (error) {
      console.error("Error fetching bookings:", error);
      // Optionally, you can dispatch an error action or set some error state
    }
  };
};

const initialState = {
  bookings: []
}

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS: 
      return {...state, bookings: action.payload};
    default:
      return state;
  }
}

export default bookingReducer;
