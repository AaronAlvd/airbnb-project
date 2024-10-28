import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import * as spotActions from "../../store/spots";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal"; // Import the modal
import "./ManageSpots.css"; // Include your CSS here

export default function ManageSpots() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.spots);
  const userId = user?.id;
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spotToDelete, setSpotToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(spotActions.getSpots());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const userSpots = spots.filter((spot) => spot.ownerId === userId);
  const navigate = useNavigate();

  const handleClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  const handleUpdate = (spotId) => {
    navigate(`/update-spot/${spotId}`);
  };

  const openModal = (spotId, event) => {
    event.stopPropagation(); // Prevent the click from bubbling up
    setSpotToDelete(spotId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSpotToDelete(null);
  };

  const confirmDelete = () => {
    if (spotToDelete) {
        setTimeout(() => {
        closeModal(); // Close the modal after a brief delay
        dispatch(spotActions.getSpots()); // Refresh spots after deletion
      }, 3500);
      dispatch(spotActions.deleteSpot(spotToDelete)); // Dispatch delete without awaiting

       // Adjust the delay as necessary
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="manage-container">
        <h2 className="manage-header">Manage Your Spots</h2>
        <div className="no-spots-message">
          <button
            onClick={() => navigate("/spotformpage")}
            className="create-new-spot-button"
          >
            Create a New Spot
          </button>
        </div>
      </div>
      <div className="grid-container">
        <div className="div-SDA-grid">
          <div className="div-spotsGallery">
            {userSpots.length > 0 ? (
              userSpots.map((spot) => {
                const reviews = spot.reviews?.Reviews || [];
                const avgRating =
                  reviews.length > 0
                    ? (
                        reviews.reduce((sum, review) => sum + review.stars, 0) /
                        reviews.length
                      ).toFixed(2)
                    : "New";

                return (
                  <div
                    className="SDA-box"
                    key={spot.id}
                    onClick={() => handleClick(spot.id)}
                  >
                    <img
                      className="SDA-Image"
                      src={spot.previewImage || "https://placehold.co/600x400"}
                      alt={spot.name}
                    />
                    <div className="div-SDA-info">
                      <span className="SDA-Location">
                        <p className="SDA-info-p">
                          {spot.city}, {spot.state}
                        </p>
                      </span>
                      <span className="SDA-Rating">
                        <p className="SDA-info-p">
                          {avgRating}{" "}
                          <FontAwesomeIcon className="SDA-icon" icon={faStar} />
                        </p>
                      </span>
                      <span className="SDA-Price">
                        <p className="SDA-info-p">${spot.price}/Night</p>
                      </span>
                      <div className="spot-action-buttons">
                        <button
                          onClick={() => handleUpdate(spot.id)}
                          className="update-button"
                        >
                          Update
                        </button>
                        <button
                          onClick={(event) => openModal(spot.id, event)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No spots found for this user.</p>
            )}
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </>
  );
}
