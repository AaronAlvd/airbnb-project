import * as spotActions from '../../../store/spots'; // Import your actions
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import './Spot.css'

function Spot() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots.spots);
  const spot = spots.find(spot => spot.id === Number(spotId));

  console.log(spot)

  useEffect(() => {
    dispatch(spotActions.getSpots());
  }, [dispatch, spotId]);

  return (
    <div className="div-spot">
      <div className="div-title">
        <h2>{spot.name}</h2>
      </div>
      <div className="div-pictures">
        <img src={spot.previewImage} className="spot-mainImage"/>
      </div>
      <div className="div-body"></div>
    </div>
  )
}

export default Spot;