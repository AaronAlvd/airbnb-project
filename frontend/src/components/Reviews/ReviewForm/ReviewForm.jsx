import "./ReviewForm.css";
import StarRating from "../StarRating";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { createReview } from "../../../store/review";

export default function ReviewForm({props}) {
  const user = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const safeReview = {
        review,
        userId:user.id,
        spotId:props.id,
        stars: window.rating
    };

    dispatch(createReview(safeReview));
  };

  return (
    <div className="div-reviewForm">
      <form onSubmit={handleSubmit} className="reviewForm">
        <div className="div-reviewTextbox">
          <label className="reviewForm-label">Share your experience</label>
          <textarea value={review} className="reviewForm-textarea" onChange={(e) => setReview(e.target.value)} required></textarea>
        </div>

        <div className="div-reviewRating">
          <label className="reviewForm-label">Rating</label>
          <StarRating className="RF-starRating"/>
        </div>

        <div className="div-reviewButton">
          <button onSubmit={handleSubmit} className="RF-submitButton" disabled={disabledButton} type="submit">Submit Review</button>
        </div>
      </form>
    </div>
  );
}
