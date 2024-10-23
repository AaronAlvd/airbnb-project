import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ListItem from "../ListItem"; // Adjust the import path
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import ReviewForm from "../ReviewForm/ReviewForm";
import "./ShowCaseReviews.css";

export default function ShowCaseReviews({ spot }) {
  const reviews = spot.Reviews || []; // Safely handle reviews
  const user = useSelector((state) => state.session.user);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (spot && user) {
      setIsOwner(spot.ownerId === user.id);
    }
  }, [spot, user]);
 console.log('reviews for spot', reviews)
  return (
    <div className="Review-list">
      <h2 className="title">Reviews</h2>
       {!isOwner && (
        <button id="reviewbutton" className="RF-modalButton">
          <OpenModalButton
            buttonText="Make Review"
            modalComponent={<ReviewForm props={spot} />}
          />
        </button>
      )}

      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ListItem
              key={review.id}
              firstname={review.User.firstName} // Adjust based on your data structure
              review={review.review}
              starsRating={review.stars} // Adjust based on your data structure
              onDelete={() => console.log(`Delete review with ID: ${review.id}`)} // Replace with delete action
            />
          ))
        ) : (
          <li>No reviews available</li>
        )}
      </ul>
    </div>
  );
}
