import { csrfFetch } from "./csrf";

const CREATE_REVIEW = 'review/CREATE_REVIEW';
const SET_REVIEWS = 'review/SET_REVIEWS';

const setReview = (review) => {
  return {
    type: CREATE_REVIEW,
    payload: review
  }
};

const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    payload: reviews
  }
};

export const createReview = (batchReview) => async (dispatch) => {
  const { review, userId, spotId, stars } = batchReview;

  try {
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
      dispatch(setReview(data.review));

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

export const getReviews = () => {
  return async (dispatch) => {
    try {
      const response = await csrfFetch('/api/reviews/current');

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      dispatch(setReviews(data.Reviews));
    } catch (err) {
      console.error("Error fetching reviews:", err);

    }
  };
};
export const getAllReviews = (spotId) => {
  // console.log("GAR",spotId)
  return async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
       console.log("Data",data)
      dispatch(setReviews(data.Reviews));
    } catch (err) {
      console.error("Error fetching reviews:", err);

    }
  };
};


const initialState = {
  reviews: []
}

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      return {...state, reviews: action.payload};
    case SET_REVIEWS:
      return {...state, reviews: action.payload};
    default:
      return state
  }
}

export default reviewReducer;
