
import { useSelector } from "react-redux";
import "./ShowCaseReviews.css";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import ReviewForm from "../ReviewForm/ReviewForm";

export default function ShowCaseReviews({ isOwner, spot }) {
  const reviews = useSelector((state) => state.reviews.reviews); // Get reviews from Redux state
console.log("reviews",reviews)
  return (
    <>
      <div className="Review-list">
        <h2 className="title">Reviews</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>{review.review}</li> 
          ))}
        </ul>

        {!isOwner && (
          <button id="reviewbutton" className="RF-modalButton">
            <OpenModalButton
              buttonText="Make Review"
              modalComponent={<ReviewForm props={spot} />}
            />
          </button>
        )}
      </div>
    </>
  );
}
