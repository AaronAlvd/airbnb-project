import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as reviewActions from "../../../store/review";
import ListItem from "../ListItem";
import ReviewForm from "../ReviewForm/ReviewForm";
import "./ShowCaseReviews.css";
import OpenModalBtnReview from "../../OpenModalButton/OpenModalBtnReview";

export default function ShowCaseReviews({ spot }) {
  const dispatch = useDispatch();
  const reviews = spot?.Reviews || [];
  const user = useSelector((state) => state.session.user);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (spot && user) {
      setIsOwner(spot.ownerId === user.id);
    }
  }, [spot, user]);

  useEffect(() => {
    // You can use this effect to trigger side effects after loading
    if (loaded) {
      setLoaded(false); // Reset loaded state for next submission
    }
  }, [loaded]);

  const handleDelete = async (reviewId) => {
    setLoading(true);
    setError(null);
    try {
      const spotId = spot.id;
      console.log("SpotId", spotId);
      await dispatch(reviewActions.DeleteReview(spotId, reviewId));
      setLoaded(true); // Trigger re-render if needed
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
      {!isOwner && (
        <OpenModalBtnReview
          buttonText="Make Review"
          modalComponent={<ReviewForm props={spot}  />}
        />
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
              loading={loading} // Optional: Pass loading state to ListItem if needed
            />
          ))
        ) : (
          <li>No reviews available</li>
        )}
      </ul>
    </div>
  );
}
