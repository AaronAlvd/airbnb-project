import * as spotActions from '../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './SpotsDisplayAll.css';

function SpotsDisplayAll() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);

  // Fetch spots when the component mounts
  useEffect(() => {
    dispatch(spotActions.getSpots());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  return (
    <div className="grid-container">
      <div className="div-SDA-grid">
        <div className="div-spotsGallery">
          {spots.map((spot) => {
            // Access the Reviews array from the reviews object
            const reviews = spot.reviews?.Reviews || [];
            const avgRating = reviews.length > 0
              ? (reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(2)
              : "New"; // Default to "New" if no reviews

            // Use default image if previewImage is not available
            const imageUrl = spot.previewImage || "https://placehold.co/600x400"; // Default image URL

            return (
              <div className="SDA-box" key={spot.id} onClick={() => handleClick(spot.id)}>
                <img className="SDA-Image" src={imageUrl} alt={spot.name} />
                <div className="div-SDA-info">
                  <span className="SDA-Location">
                    <p className="SDA-info-p">{spot.city}, {spot.state}</p>
                  </span>
                  <span className="SDA-Rating">
                    <p className="SDA-info-p">{avgRating} <FontAwesomeIcon className="SDA-icon" icon={faStar} /></p>
                  </span>
                  <span className="SDA-Price">
                    <p className="SDA-info-p">${spot.price}/Night</p>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SpotsDisplayAll;
