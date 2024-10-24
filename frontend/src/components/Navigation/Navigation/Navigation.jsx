import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileButton } from '../ProfileButton';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import LoginFormModal from '../../LoginFormModal/LoginFormModal';
import SignupFormModal from '../../SignUp/SignUpForm';
import * as sessionActions from '../../../store/session';
import './Navigation.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  function logoClick() {
    navigate('/');
  }

  return (
    <div className="div-nav">
      <div className="logo">
        <img className="nav-logo" src="'../../../../public/GroundBNB24.jpg" onClick={logoClick}/>
      </div>
      <div className="div-ul">
        <ul className="nav-ul">
          <li className="nav-li"><NavLink to="/spotformpage"><p className="userInfo">Create a New Spot</p></NavLink></li>
          <ProfileButton/>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;