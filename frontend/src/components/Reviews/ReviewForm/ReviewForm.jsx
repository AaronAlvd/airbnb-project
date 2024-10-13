import "./ReviewForm.css";
import StarRating from "../StarRating";
import { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { makeReview } from "../../../store/spots";
export default function ReviewForm(props) {
  const spot = props.spot;
  const user = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const safeReview = {
        review,
        userId:user.id,
         spotId:spot.id,
         stars: window.rating
        };
        dispatch(makeReview(safeReview));
    console.log("form submitted");
    console.log(safeReview);

  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h1>How was your Stay? </h1>
      <input
        type="text"
        placeholder="Write your review here..."
        required
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "30px",
          margin: "10px 0px 10px 0px",
        }}
      />
      <h2>Rating</h2>
      <StarRating />
      <button onSubmit={handleSubmit} className="submit" type="submit">
        Submit Review
      </button>
    </form>
  );
}
