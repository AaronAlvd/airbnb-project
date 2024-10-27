import './ConfirmDeleteSpot.css'
import * as spotActions from '../../../store/spots'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ConfirmDeleteSpot({ spotId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteSpot = async () => {
   try {
     const response = await dispatch(spotActions.deleteSpot(spotId));

     // Ensure the response is valid
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }

     const data = await response.json();

     // Check if the deletion was successful based on the response data
     if (data.success) {
       console.log('Spot deleted successfully:', data);
       navigate('/');
     } else {
       console.error('Failed to delete spot:', data.message);
     }
   } catch (err) {
     console.error('Failed to delete spot', err);
   }
  };

  return (
    <div className="div-CDS">
      <button onClick={deleteSpot}>Confirm Delete</button>
    </div>
  )
}

export default ConfirmDeleteSpot;