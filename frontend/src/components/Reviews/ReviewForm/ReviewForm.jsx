import "./ReviewForm.css";
import StarRating from "../StarRating";
import * as spotActions from "../../../store/spots";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createReview } from "../../../store/review";
import { useModal } from '../../../context/modal';

export default function ReviewForm({ props }) {
  const user = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0); // State for stars
  const [disabled, setDisabled] = useState(true); // Initially disabled
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const safeReview = {
      review,
      userId: user.id,
      spotId: props.id,
      stars, // Use the stars state
    };

    try {
      await dispatch(createReview(safeReview));
      dispatch(spotActions.getSingleSpot(props.id));
      closeModal();
      console.log("Form submitted", safeReview);
    } catch (error) {
      console.error("Failed to submit review:", error);
      // Optionally, handle the error (e.g., display an error message)
    }
  };

  useEffect(() => {
    setDisabled(review.length < 10 || stars === 0); // Update disabled state
  }, [review, stars]);

  return (
    <div className="div-reviewForm">
      <form onSubmit={handleSubmit} className="reviewForm">
        <div className="div-reviewTextbox">
          <label className="reviewForm-label">How Was Your Stay?</label>
          <textarea
            value={review}
            className="reviewForm-textarea"
            onChange={(e) => setReview(e.target.value)}
            required
            placeholder="Leave your review here..."
          />
        </div>

        <div className="div-reviewRating">
          <label className="reviewForm-label">Stars</label>
          <StarRating setStars={setStars} /> {/* Pass setStars to StarRating */}
        </div>

        <div className="div-reviewButton">
          <button
            className="RF-submitButton"
            type="submit"
            disabled={disabled} // Disable button based on the disabled state
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}
