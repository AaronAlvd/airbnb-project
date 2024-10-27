import { useEffect } from "react";
import * as spotActions from "../../../store/spots"; 
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import EditSpots from "../EditSpots/EditSpots";
import ConfirmDeleteSpot from "../ConfirmDeleteSpot/ConfirmDeleteSpot";
import { useNavigate } from "react-router-dom";
import './ManageSpots.css'


function ManageSpots() {
  const spots = useSelector((state) => state.spots.spots);
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const userSpots = spots.reduce((acc, spot) => {
    if (spot.ownerId === user.id) {
      acc.push(spot);
    }
    return acc;
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSpots = async () => {
      if (user) {
        await Promise.all([
          dispatch(spotActions.getSpots()),
        ])
      }
    }
    fetchSpots();
  }, [user, dispatch])

  return (

    <div>
      <h2>Manage Spots</h2>
      <div className="div-SDA-grid">
        <div className="div-spotsGallery">
          {userSpots.length > 0 ? userSpots.map((spot) => {
            return (
              <div className="SDA-box" key={spot.id}>
                <img className="SDA-Image"src={spot.previewImage} onClick={() => navigate(`/spots/${spot.id}`)}/>
                <div className="div-SDA-info">
                  <span className="SDA-Location"><p className="SDA-info-p">{spot.city}, {spot.state}</p></span>
                  {spot.avgRating ? <span className="SDA-Rating"><p className="SDA-info-p">{spot.avgRating}<FontAwesomeIcon className="SDA-icon"icon={faStar}/></p></span> :
                                    <span className="SDA-Rating"><p className="SDA-info-p">New</p><FontAwesomeIcon className="SDA-icon"icon={faStar}/></span>}
                  <span className="SDA-Price"><p className="SDA-info-p">${spot.price}<small className="SDA-priceNight">/night</small></p></span>
                </div>
                <button onClick={() => {
                  navigate('/updatespotform')}
                  }>Update</button>
                <button>
                  <OpenModalButton buttonText="Delete" modalComponent={<ConfirmDeleteSpot spotId={spot.id}/>}/>
                </button>
              </div>
            )
          }): <h2>No Spots Available</h2>
          }
        </div>
      </div>
    </div>
  );
}

export default ManageSpots;