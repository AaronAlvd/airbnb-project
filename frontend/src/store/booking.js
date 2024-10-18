// import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "./csrf";

const GET_BOOKINGS = 'bookings/getBookings'
const CREATE_BOOKING = 'bookings/createBooking'

const setBooking = (bookings) => {
  return {
    type: GET_BOOKINGS,
    payload: bookings
  }
}
const addBooking = (bookings) => {
  return {
    type: CREATE_BOOKING,
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

export const createBooking = (id, bookingData) => async (dispatch) => {
  try {
      console.log("Creating booking with ID:", id, "and data:", bookingData);
      const response = await csrfFetch(`/api/spots/${id}/bookings`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error creating booking");
      }

      const data = await response.json();
      dispatch({ type: 'CREATE_BOOKING', payload: data });
  } catch (error) {
      console.error("Error in createBooking:", error);
      throw error; // This will propagate the error to the caller
  }
};



const initialState = {
  bookings: []
}

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS:
      return {...state, bookings: action.payload};
    case CREATE_BOOKING:
      return {
        ...state,
        bookings: [...state.bookings, action.payload]
      };
    default:
      return state;
  }
}

export default bookingReducer;
