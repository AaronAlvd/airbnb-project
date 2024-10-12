import * as spotActions from '../../store/spots'; // Import your actions
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './spots.css'

function Spots() {
  const dispatch = useDispatch();
  
  // Assuming the spots are stored as an array in state.spots.spots
  const spots = useSelector((state) => state.spots.spots); // Adjust according to your state structure

  // Fetch spots when the component mounts
  useEffect(() => {
    dispatch(spotActions.getSpots());
  }, [dispatch]);

  return (
    <div>
      {spots.map((spot) => {
        const { id, previewImage } = spot; // Destructure for clarity

        return (
          <div key={id}> {/* Add a unique key here */}
            {previewImage ? ( // Conditional rendering for the image
              <img src={previewImage} alt={`Preview of ${spot.name}`} className="displayImages" />
            ) : (
              <p>No preview available</p> // Handle the case when there is no preview image
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Spots;

