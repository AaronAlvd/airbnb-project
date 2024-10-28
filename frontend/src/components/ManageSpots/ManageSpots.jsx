import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../Spots/SpotsDisplayAll/SpotsDisplayAll.css'; // Reuse the same CSS styles
import * as spotActions from '../../store/spots';

export default function ManageSpots() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.spots);
  const userId = user?.id; // Use optional chaining to handle cases where user might be null
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(spotActions.getSpots()); // Fetch spots
      setLoading(false); // Set loading to false once spots are fetched
    };

    fetchData();
  }, [dispatch]); // Dispatch will trigger the effect

  // Filter spots to only include those owned by the user
  const userSpots = spots.filter((spot) => spot.ownerId === userId);

  const navigate = useNavigate();

  const handleClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  const handleUpdate = (spotId) => {
    navigate(`/update-spot/${spotId}`); // Navigate to the update page
  };

  const handleDelete = async (spotId) => {
    if (window.confirm("Are you sure you want to delete this spot?")) {
      await dispatch(spotActions.deleteSpot(spotId)); // Dispatch the delete action
      // Optionally, you can re-fetch spots here to update the list
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  return (
    <>
      <h2 className="manage-header">Manage Spots</h2>
      <div className="grid-container">
        <div className="div-SDA-grid">
          <div className="div-spotsGallery">
            {userSpots.length > 0 ? (
              userSpots.map((spot) => {
                const reviews = spot.reviews?.Reviews || [];
                const avgRating = reviews.length > 0
                  ? (reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length).toFixed(2)
                  : "New";

                return (
                  <div className="SDA-box" key={spot.id} onClick={() => handleClick(spot.id)}>
                    <img className="SDA-Image" src={spot.previewImage} alt={spot.name} />
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
                      <div className="spot-action-buttons">
                        <button onClick={() => handleUpdate(spot.id)} className="update-button">Update</button>
                        <button onClick={() => handleDelete(spot.id)} className="delete-button">Delete</button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-spots-message">
                <p>No spots found for this user.</p>
                <button onClick={() => navigate('/spotformpage')} className="create-new-spot-button">
                  Create a New Spot
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
