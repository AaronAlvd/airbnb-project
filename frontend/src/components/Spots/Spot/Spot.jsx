import * as spotActions from "../../../store/spots"; // Import your actions
import * as bookingActions from '../../../store/booking';
import * as reviewActions from '../../../store/review';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Spot.css";
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import ReviewForm from "../../Reviews/ReviewForm/ReviewForm";

function Spot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots.spots);
  const user = useSelector((state) => state.session.user)
  const bookings = useSelector((state) => state.bookings.bookings)
  const spot = spots.find((spot) => spot.id === Number(spotId));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);   // Set loading state before fetch starts
      setError(null);     // Clear any previous error messages
  
      try {
        if (user) {
          await Promise.all([
            dispatch(spotActions.getSpots()),
            dispatch(reviewActions.getReviews()),
            dispatch(bookingActions.getBookings())
          ]);
        } else {
          dispatch(spotActions.getSpots())
        }
      } catch (err) {
        setError("Failed to load spots or bookings.");  // General error message
      } finally {
        setLoading(false);  // Reset loading state once done
      }
    };
  
    fetchSpots();
  }, [dispatch, spotId]);  // Dependencies: re-run on `spotId` or `dispatch` change

  useEffect(() => {
     bookings.forEach((booking) => {
      if (new Date(booking.endDate).getTime() < Date.now()) {
        setShowReview(true);
      }
     });

     setShowReview(true);

  }, [showReview]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!spot) return <div>Spot not found.</div>;

  return (
      <div className="div-spot">
        <div className="div-title">
          <h2>{spot.name}</h2>
        </div>
        <div className="div-pictures">
          <img src={spot.previewImage} className="spot-mainImage" />
        </div>
        <div className="div-body">
          {showReview && <button className="RF-modalButton">
            <OpenModalButton buttonText="Make Review" modalComponent={<ReviewForm props={spot}/>}/>
          </button>}
        </div>
      </div>
  );
}

export default Spot;
