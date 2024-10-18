import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileButton } from '../ProfileButton';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import LoginFormModal from '../../LoginFormModal/LoginFormModal';
import SignupFormModal from '../../SignUp/SignUpForm';
import * as sessionActions from '../../../store/session';
import './Navigation.css'
import { HiOutlinePaperAirplane } from "react-icons/hi2";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <li>
  //       <ProfileButton user={sessionUser} className="nav-profileButtons"/>
  //     </li>
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //     <li>
  //       <OpenModalButton className="ModalButton" buttonText="Log In" modalComponent={<LoginFormModal/>}/>
  //     </li>
  //     <li>
  //       <OpenModalButton className="ModalButton" buttonText="Sign Up" modalComponent={<SignupFormModal/>}/>
  //     </li>
  //     </>
  //   );
  // }

  return (
    <div className="div-nav">
      <div className="logo"></div>
      <div className="div-ul">
        <ul className="nav-ul">
          <li className="nav-li">
            <NavLink to="/"> <HiOutlinePaperAirplane />AIRBNB</NavLink>
          </li >

          <ProfileButton className="Profile" />
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
