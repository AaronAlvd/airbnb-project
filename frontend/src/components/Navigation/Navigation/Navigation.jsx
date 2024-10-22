import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileButton } from '../ProfileButton';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import LoginFormModal from '../../LoginFormModal/LoginFormModal';
import SignupFormModal from '../../SignUp/SignUpForm';
import * as sessionActions from '../../../store/session';
import './Navigation.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="div-nav">
      <div className="logo"></div>
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