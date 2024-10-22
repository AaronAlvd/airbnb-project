import * as spotActions from "../../../store/spots"; // Import your actions
import * as bookingActions from '../../../store/booking';
import * as reviewActions from '../../../store/review';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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
  const spotReviews = useSelector((state) => state.reviews.reviews)

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);   // Set loading state before fetch starts
      setError(null);     // Clear any previous error messages
  
      try {
        if (user) {
          await Promise.all([
            dispatch(spotActions.getSpots()),
            dispatch(reviewActions.getReviews()),
            dispatch(reviewActions.getSpotReviews(spotId)),
            dispatch(bookingActions.getBookings())
          ]);
        } else {
          dispatch(spotActions.getSpots()),
          dispatch(reviewActions.getSpotReviews(spotId))
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
    if (user && spot && (spot.ownerId === user.id)) {
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
        </div>
        <div className="div-body">
          <div className="div-upperBody">
            <div className="div-upperBodyLeft">
              <div className="spotDescription">
                <h3 className="SD-host">Hosted by Aaron Alvarado</h3>
                <p>{spot.description}</p>
              </div>
            </div>
            <div className="div-upperBodyRight">
              <div className="div-spotReserve">
                <div className="div-spotReserveTop">
                  <div className="div-SRT-left">
                    <span className="spotReserve"><p className="spotReserve SR-price">${spot.price}</p><small className="SD-subscript">night</small></span>
                  </div> 
                  <div className="div-SRT-right">
                    {spot.avgRating ? <p className="spotReserve">{spot.avgRating}</p> : <p className="spotReserve"> 0 <FontAwesomeIcon className="SD-icon"icon={faStar}/></p>}
                    <p className="spotReserve">{spotReviews.length} {spotReviews.length > 1 ? "Reviews" : "Review"}</p>
                  </div>  
                </div>
                  <div>
                    <button className="SD-reserveButton">Reserve</button>
                  </div>
              </div>
              {/* {showReview && <button className="SD-Button">
                <OpenModalButton buttonText="Make Review" modalComponent={<ReviewForm props={spot}/>}/>
              </button>}
              {owner && <button className="SD-Button">
                <OpenModalButton buttonText="Edit"/>
              </button>} */}
            </div>
          </div>
          <div className="div-lowerBody">
            <div className="div-lowerBodyTitle">
              {spot.avgRating ? <p className="LB-Reviews">{spot.avgRating}</p> : <p className="LB-Reviews"> 0 <FontAwesomeIcon className="SD-icon"icon={faStar}/></p>}
              <p className="LB-Reviews">{spotReviews.length} {spotReviews.length > 1 ? "Reviews" : "Review"}</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Spot;
