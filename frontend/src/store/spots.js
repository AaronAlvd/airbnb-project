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
        const formattedSpots = data.Spots.map((data) => {
          const previewImage = data.spot.SpotImages[0].preview

          return {
            id: data.spot.id,
            ownerId: data.spot.userId,
            address: data.spot.address,
            city: data.spot.city,
            state: data.spot.state,
            country: data.spot.country,
            lat: data.spot.lat,
            lng: data.spot.lng,
            name: data.spot.name,
            description: data.spot.description,
            price: data.spot.price,
            createdAt: data.spot.createdAt,
            updatedAt: data.spot.updatedAt,
            avgRating: data.spot.avgStarRating.toFixed(2),
            previewImage
          };
        })
        dispatch(setSpots(formattedSpots)); // Dispatch the action with the fetched spots
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

export const addSpotImage = (data) => async () => {
  try {
    const { url, spotId } = data;

    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        url: url,
        preview: false
      }
    })

    if (!response.ok) {
      throw new Error("Failed to add Image.");
    }

    const newData = await response.json();

    return newData;
  } catch (err) {
    console.error("Error adding Image:", err);
    return err;
  }
}

export const createSpot = (data) => async (dispatch) => {
  try {
    const { address, lng, lat, city, state, country, description, price, name } = data;

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
        price,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create a spot.");
    }

    const newData = await response.json();
    dispatch(addSpot(newData));

    return newData;
  } catch (err) {
    console.error("Error creating spot:", err);
    return err;
  }
};

export const editSpot = (data, spotId) => async (dispatch) => {
  try {
    const { address, lng, lat, city, state, country, description, price, name } = data;

    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
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
        price,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create a spot.");
    }

    const newData = await response.json();
    dispatch(addSpot(newData));

    return newData;
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
  spots: [],
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.payload };
    case ADD_SPOT: {
      const newSpot = action.payload;
      return {
        ...state,
        spots: {
          ...state.spots,
          [newSpot.id]: newSpot,
        },
      };
    }
    case DELETE_SPOT: {
      const updatedSpots = state.spots.filter(spot => spot.id !== action.payload.spotId);
      return {
        ...state,
        spots: updatedSpots,
      };
    }
    default:
      return state;
  }
};

export default spotReducer;
