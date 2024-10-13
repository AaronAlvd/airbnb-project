import * as spotActions from "../../../store/spots"; // Import your actions
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import "./Spot.css";
import Reviews from "../../Reviews";
function Spot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots.spots);
  const spot = spots.find((spot) => spot.id === Number(spotId));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        await dispatch(spotActions.getSpots());
      } catch (err) {
        setError("Failed to load spots.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, [dispatch, spotId]);

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
        <div className="div-body"><Reviews  spot={spot}/></div>

      </div>

  );
}

export default Spot;
