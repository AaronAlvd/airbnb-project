import "./ReviewForm.css";
import StarRating from "../StarRating";
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { createReview } from "../../../store/review";
import { useModal } from '../../../context/modal';

export default function ReviewForm({props}) {
  const user = useSelector((state) => state.session.user);

  const [review, setReview] = useState("");
  const dispatch = useDispatch();
//   const { closeModal } = useModal();
// console.log(props.id)

  const handleSubmit = (e) => {
    e.preventDefault();
    const safeReview = {
        review,
        userId:user.id,
        spotId:props.id,
         stars: window.rating
        };
        dispatch(createReview(safeReview));
    console.log("form submitted");
    console.log(safeReview);
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
          <button onSubmit={handleSubmit} className="RF-submitButton" type="submit">Submit Review</button>
        </div>
      </form>
    </div>
  );
}
