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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!spot) return <div>Spot not found.</div>;

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
          <img src={spot.SpotImages[0].url} id="image-01" alt={spot.name} />
        </div>

        {/* Side images in a grid */}
        <div className="div-sideImages">
          {Array(4).fill().map((_, index) => (
            <div key={index} className="sideImage">
              <img
                src="https://placehold.co/300x200" // Placeholder image
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
          <ShowCaseReviews spot={spot} />
        </div>
      </div>
    </div>
  );
}

export default Spot;
