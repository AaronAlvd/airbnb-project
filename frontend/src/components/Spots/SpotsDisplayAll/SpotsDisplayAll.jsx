// import * as spotActions from '../../../store/spots'; // Import your actions
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons';
// import './SpotsDisplayAll.css'

// function SpotsDisplayAll() {
//   const dispatch = useDispatch();

//   // Assuming the spots are stored as an array in state.spots.spots
//   const spots = useSelector((state) => state.spots.spots); // Adjust according to your state structure
//   console.log("Spots from Redux:", spots);

//   // Fetch spots when the component mounts
//   useEffect(() => {
//     dispatch(spotActions.getSpots());
//   }, [dispatch]);

//   const navigate = useNavigate();

//   const handleClick = (spotId) => {
//     navigate(`/spots/${spotId}`);
//   }

//   return (
//     <div className="grid-container">
//     <div className="div-SDA-grid">
//       <div className="div-spotsGallery">
//         {spots.map((spot) => {
//           return (
//             <div className="SDA-box" key={spot.id} onClick={() => handleClick(spot.id)}>
//               <img className="SDA-Image"src={spot.previewImage}/>
//               <div className="div-SDA-info">
//                 <span className="SDA-Location"><p className="SDA-info-p">{spot.city}, {spot.state}</p></span>
//                 {spot.avgRating ? <span className="SDA-Rating"><p className="SDA-info-p">{spot.avgRating}<FontAwesomeIcon className="SDA-icon"icon={faStar}/></p></span> :
//                                   <span className="SDA-Rating"><p className="SDA-info-p">0</p><FontAwesomeIcon className="SDA-icon"icon={faStar}/></span>}
//                 <span className="SDA-Price"><p className="SDA-info-p">${spot.price}</p></span>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//     </div>
//   );
// }

// export default SpotsDisplayAll;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './SpotsDisplayAll.css';

function SpotsDisplayAll() {
  const [spots, setSpots] = useState([]); // Local state to hold spots data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch spots data when the component mounts
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch('/api/spots');
        if (!response.ok) throw new Error("Error fetching spots data");

        const data = await response.json();
        console.log('spot data from fetch', data)
        setSpots(data.Spots); // Set fetched spots data to local state
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchSpots();
  }, []);

  const handleClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  if (loading) return <p>Loading spots...</p>;

  return (
    <div className="grid-container">
      <div className="div-SDA-grid">
        <div className="div-spotsGallery">
          {spots.map((spot) => (
            <div className="SDA-box" key={spot.id} onClick={() => handleClick(spot.id)}>
              <img className="SDA-Image" src={spot.previewImage} alt={`${spot.name} preview`} />
              <div className="div-SDA-info">
                <span className="SDA-Location">
                  <p className="SDA-info-p">{spot.city}, {spot.state}</p>
                </span>
                {spot.avgRating ? (
                  <span className="SDA-Rating">
                    <p className="SDA-info-p">{spot.avgRating}</p>
                    <FontAwesomeIcon className="SDA-icon" icon={faStar} />
                  </span>
                ) : (
                  <span className="SDA-Rating">
                    <p className="SDA-info-p">0</p>
                    <FontAwesomeIcon className="SDA-icon" icon={faStar} />
                  </span>
                )}
                <span className="SDA-Price">
                  <p className="SDA-info-p">${spot.price}</p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpotsDisplayAll;


