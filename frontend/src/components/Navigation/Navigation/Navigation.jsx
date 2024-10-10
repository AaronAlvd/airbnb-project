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

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} className="nav-profileButtons"/>
      </li>
    );
  } else {
    sessionLinks = (
      <>
      <li>
        <OpenModalButton buttonText="Log In" modalComponent={<LoginFormModal/>}/>
      </li>
      <li>
        <OpenModalButton buttonText="Sign Up" modalComponent={<SignupFormModal />}/>
      </li>
      </>
    );
  }

  return (
    <div className="div-nav">
      <div className="logo"></div>
      <div className="div-ul">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {isLoaded && sessionLinks}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;