import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as reviewActions from "../../../store/review";
import ListItem from "../ListItem";
import ReviewForm from "../ReviewForm/ReviewForm";
import "./ShowCaseReviews.css";
import OpenModalBtnReview from "../../OpenModalButton/OpenModalBtnReview";

export default function ShowCaseReviews({ spot, num, averageRating }) {
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
    if (loaded) {
      setLoaded(false); // Reset loaded state for next submission
    }
  }, [loaded]);

  const handleDelete = async (reviewId) => {
    setLoading(true);
    setError(null);
    try {
      const spotId = spot.id;
      await dispatch(reviewActions.DeleteReview(spotId, reviewId));
      setLoaded(true); // Trigger re-render if needed
    } catch (error) {
      console.error("Failed to delete review:", error);
      setError("Error deleting review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if the user has already posted a review
  const userHasPostedReview = reviews.some((review) => review.userId === user?.id);

  return (
    <div className="Review-list">
      <h2 className="title">
        {reviews.length === 0 ? (
          'New ⭐'
        ) : (
          `Average Rating: ${averageRating} ${averageRating > 0 ? '⭐' : ''} · ${num} Review${num !== 1 ? 's' : ''}`
        )}
      </h2>
      {/* Hide the button if the user is not logged in or has already posted a review */}
      {!isOwner && user && !userHasPostedReview && (
        <OpenModalBtnReview
          buttonText="Post Your Review"
          modalComponent={<ReviewForm props={spot} />}
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
              loading={loading}
              createdAt={review.createdAt} // Pass the createdAt prop
            />
          ))
        ) : (
          !isOwner && user && <li>Be the first to post a review!</li> // Show message if logged in user is not the owner
        )}
      </ul>
    </div>
  );
}
