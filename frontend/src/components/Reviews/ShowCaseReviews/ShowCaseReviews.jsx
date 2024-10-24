import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as reviewActions from "../../../store/review";
import ListItem from "../ListItem"; // Adjust the import path
// import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import ReviewForm from "../ReviewForm/ReviewForm";
import "./ShowCaseReviews.css";
import OpenModalBtnReview from "../../OpenModalButton/OpenModalBtnReview";

export default function ShowCaseReviews({ spot }) {
  const dispatch = useDispatch();
  const reviews = spot?.Reviews || []; // Safely handle reviews
  const user = useSelector((state) => state.session.user);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error messages

  useEffect(() => {
    if (spot && user) {
      setIsOwner(spot.ownerId === user.id);
    }
  }, [spot, user]);

  const handleDelete = async (reviewId) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(reviewActions.DeleteReview(reviewId));
      window.alert(`Review deleted with id of ${reviewId}`);
    } catch (error) {
      console.error("Failed to delete review:", error);
      setError("Error deleting review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Review-list">
      <h2 className="title">Reviews</h2>
      {!isOwner && (<>
        <OpenModalBtnReview
          buttonText="Make Review"
          modalComponent={<ReviewForm props={spot} />}
        /></>
      )}

      {error && <p className="error">{error}</p>}

      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ListItem
              key={review.id}
              userId={review.userId}
              firstname={review.User.firstName}
              review={review.review}
              starsRating={review.stars}
              onDelete={() => handleDelete(review.id)}
              loading={loading} // Optionally pass loading state to ListItem if needed
            />
          ))
        ) : (
          <li>No reviews available</li>
        )}
      </ul>
    </div>
  );
}
