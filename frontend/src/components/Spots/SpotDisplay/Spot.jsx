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
  const [owner, setOwner] = useState(false);

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

  useEffect(() => {
    if (spot.ownerId === user.id) {
      setOwner(true);
    }
  },[owner]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!spot) return <div>Spot not found.</div>;

  return (
      <div className="div-spot">
        <div className="div-title">
          <h2>{spot.name}</h2>
        </div>
        <div className="div-pictures">
          <div  className="div-mainImage" id="picture-01">
            <img src={spot.previewImage} id="image-01"/>
          </div>

          <div  className="div-sideImage" id="picture-02">
          </div>

          <div  className="div-sideImage" id="picture-03">
          </div>

          <div  className="div-sideImage" id="picture-04">
          </div>

          <div  className="div-sideImage" id="picture-05">
          </div>

          <div  className="div-sideImage" id="picture-06">
          </div>

          <div  className="div-sideImage" id="picture-07">
          </div>
        </div>
        <div className="div-body">
          <div className="spotDescription"><p>{spot.description}</p></div>
          {showReview && <button className="RF-modalButton">
            <OpenModalButton buttonText="Make Review" modalComponent={<ReviewForm props={spot}/>}/>
          </button>}
          {owner && <button className="RF-modalButton">
            <OpenModalButton buttonText="Edit"/>
          </button>}
        </div>
      </div>
  );
}

export default Spot;