import './ManageReviews.css';
import * as reviewActions from '../../../store/review';
import * as sessionActions from '../../../store/session.js';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import DeleteReviewConfirm from './DeleteReviewConfirm.jsx';

function ManageReviews() {
  const reviews = useSelector((state) => state.reviews.reviews)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        await Promise.all([     
          dispatch(reviewActions.getReviews()),
          dispatch(sessionActions.restoreUser()),     
        ]);
      } catch (err) {
        console.error(err)
      }
    };
  
    fetchSpots();
  }, [dispatch]);

  const showReviews = () => {
    if (!reviews) {
      return null
    } else {
      return reviews.length > 1 ? 
        reviews.map((review) => {
          const createdAt = new Date(review.createdAt);
          const traditionalDate = createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <div className="div-MSR" key={review.id}>
              <div className="div-reviewTop">
                <h3 className="reviewTop">{review.User.firstName} {review.User.lastName}</h3><h3 className="reviewTop">{review.stars}<FontAwesomeIcon className="SD-icon"icon={faStar}/></h3>
              </div>
              <small>{traditionalDate}</small>
              <p>{review.review}</p>
              <button>
                <OpenModalButton buttonText="Delete Review" modalComponent={<DeleteReviewConfirm reviewId={review.id}/>}/>
              </button>
            </div>
          )
        }) : 
        (<div className="div-MSR">
          <h3>{reviews[0].User.firstName}</h3>
        </div>)
    }
  }

  return (
    <div>
      {showReviews()}
    </div>
  )
}

export default ManageReviews;