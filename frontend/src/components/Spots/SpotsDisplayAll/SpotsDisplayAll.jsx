import * as spotActions from '../../../store/spots'; // Import your actions
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SpotsDisplayAll.css'

function SpotsDisplayAll() {
  const dispatch = useDispatch();

  // Assuming the spots are stored as an array in state.spots.spots
  const spots = useSelector((state) => state.spots.spots); // Adjust according to your state structure

  // Fetch spots when the component mounts
  useEffect(() => {
    dispatch(spotActions.getSpots());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  }

  return (
    <div className="div-spotsGallery">
      {spots.map((spot) => {
        return (
          <div className="box" key={spot.id} onClick={() => handleClick(spot.id)}>
            <p className="spotName">{spot.name}</p>
            <img className="spotImage"src={spot.previewImage}/>
            <p className="spotPrice">${spot.price}</p>
          </div>
        )
      })}
    </div>
  );
}

export default SpotsDisplayAll;
