import * as spotActions from "../../../store/spots"; 
import * as bookingActions from '../../../store/booking';
import * as reviewActions from '../../../store/review';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import ReviewForm from '../../Reviews/ReviewForm/ReviewForm';
import EditSpots from "../EditSpots/EditSpots";
import DeleteReviewConfirm from '../../Reviews/ManageReviews/DeleteReviewConfirm';
import "./Spot.css";


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
  const reviews = useSelector((state) => state.reviews.reviews)

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
  }, [dispatch, spotId, user]);  // Dependencies: re-run on `spotId` or `dispatch` change

  useEffect(() => {
     bookings.forEach((booking) => {
      if (booking.spotId === spotId && new Date(booking.endDate).getTime() < Date.now()) {
        setShowReview(true);
      }
     });

  }, [showReview, bookings, spotId]);

  useEffect(() => {
    if (user && spot && (spot.ownerId === user.id)) {
      setOwner(true);
    }
  },[owner, spot, user]);

  const showReviews = () => {
    if (!reviews) {
      return null
    } else {
        const lessThanOne = reviews.length > 0 ? (<div className="div-spotReview">
          <h3>{reviews[0].User.firstName}</h3>
        </div>) : 
        (<h3>Be the first to post a review</h3>)

      return reviews.length > 1 ? 
        reviews.map((review) => {
          const createdAt = new Date(review.createdAt);
          const traditionalDate = createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <div className="div-spotReview" key={review.id}>
              <div className="div-reviewTop">
                <h3 className="reviewTop">{review.User.firstName} {review.User.lastName}</h3><h3 className="reviewTop">{review.stars}<FontAwesomeIcon className="SD-icon"icon={faStar}/></h3>
              </div>
              <small>{traditionalDate}</small>
              <p>{review.review}</p>
              {user.id === review.User.id && <button className='SD-deleteReviewButton'>
                <OpenModalButton buttonText="Delete Review" modalComponent={<DeleteReviewConfirm reviewId={review.id}/>}/>
              </button>}
            </div>
          )
        }) : lessThanOne

    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!spot) return <div>Spot not found.</div>;

  return (
      <div className="div-spot">
        <div className="div-title">
          <h2 className="spotTitleName">{spot.name}</h2>
          <p className="spotTitlePlace">{spot.city}, {spot.state}, {spot.country}</p>
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
                    {spot.avgRating ? <p className="spotReserve">{spot.avgRating} <FontAwesomeIcon className="SD-icon"icon={faStar}/></p> : <p className="spotReserve">New</p>}
                    <p className="centered-DOT">.</p><p className="spotReserve">{reviews.length} {reviews.length > 1 ? "Reviews" : "Review"}</p>
                  </div>  
                </div>
                  <div>
                    <button className="SD-reserveButton" onClick={() => window.alert("Feature coming soon")}>Reserve</button>
                  </div>
              </div>
              <div className="div-SD-buttons">
                {/* showReview && */<button className="SD-Button">
                  <OpenModalButton buttonText="Make Review" modalComponent={<ReviewForm props={spot}/>}/>
                </button>}
                {/* {owner && <button className="SD-Button">
                  <OpenModalButton buttonText="Edit" modalComponent={<EditSpots spotId={spotId}/>}/>
                </button>} */}
              </div>
            </div>
          </div>
          <div className="div-lowerBody">
            <div className="div-lowerBodyTitle">
              {spot.avgRating ? <p className="LB-Reviews">{spot.avgRating} <FontAwesomeIcon className="SD-icon"icon={faStar}/></p> : <p className="LB-Reviews"> 0 <FontAwesomeIcon className="SD-icon"icon={faStar}/></p>}
              <p className="centered-DOT">.</p><p className="LB-Reviews">{reviews.length }</p><p>{reviews.length > 1 ? "Reviews" : "Review"}</p>
            </div>
            <div className="div-lowerBodyReviews">
              {showReviews()}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Spot;
