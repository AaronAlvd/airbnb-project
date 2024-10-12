import * as spotActions from '../../store/spots'; // Import your actions
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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
      {/* {spots.map((spot) => {
        return (
          <img src={}/>
        )
      })} */}
    </div>
  );
}

export default Spots;

