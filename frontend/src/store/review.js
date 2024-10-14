import { csrfFetch } from "./csrf";
const CREATE_REVIEW = 'review/CREATE_REVIEW';

const setReview = (review) => {
  return {
    type: CREATE_REVIEW,
    payload: review
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

const initialState = {
  reviews: []
}

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      return {...state, reviews: action.payload};
    default:
      return state
  }
}
export default reviewReducer;
