import * as spotActions from "../../../store/spots";
import * as bookingActions from "../../../store/booking";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Spot.css";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import ShowCaseReviews from "../../Reviews/ShowCaseReviews";

function Spot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.spot);
  const user = useSelector((state) => state.session.user);
  const reviews = spot?.Reviews || [];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([
          dispatch(spotActions.getSingleSpot(spotId)),
          user ? dispatch(bookingActions.getBookings()) : Promise.resolve(),
        ]);
      } catch (err) {
        setError("Failed to load spots or bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchSpots();
  }, [dispatch, spotId, user]);

  useEffect(() => {
    if (spot && user) {
      setOwner(spot.ownerId === user.id);
    }
  }, [spot, user]);

  const calculateAverageRating = () => {
    if (!reviews.length) return 0;

    const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
    return (totalStars / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!spot) return <div>Spot not found.</div>;

  // Use default image if no SpotImages are available
  const mainImageUrl = (spot.SpotImages && spot.SpotImages.length > 0)
    ? spot.SpotImages[0].url
    : "https://placehold.co/600x400"; // Default image URL

  return (
    <div className="div-spot">
      <div className="div-title">
        <h2>{spot.name}</h2>
      </div>
      <div id="location">
        <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
      </div>
      <div className="div-pictures">
        <div className="div-mainImage" id="picture-01">
          <img src={mainImageUrl} id="image-01" alt={spot.name} />
        </div>
        <div className="div-sideImages">
          {Array(4).fill().map((_, index) => (
            <div key={index} className="sideImage">
              <img
                src="https://placehold.co/300x200" // Placeholder for side images
                alt={`Placeholder ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="spotDescription">
        <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
        <p>{spot.description}</p>
      </div>
      <div className="div-body">
        <div className="reserve-container">
          <p id="spotprice">${spot.price}/Night</p>
          {owner && (
            <button className="RF-modalButton">
              <OpenModalButton buttonText="Edit" />
            </button>
          )}
          {!owner && (
            <button
              id="reservebutton"
              className="RF-modalButton"
              onClick={() => window.alert("Feature Coming Soon!!")}
            >
              Reserve
            </button>
          )}
        </div>

        <div id="review">
          <ShowCaseReviews spot={spot} num={reviews.length} averageRating={averageRating} />
        </div>
      </div>
    </div>
  );
}

export default Spot;
