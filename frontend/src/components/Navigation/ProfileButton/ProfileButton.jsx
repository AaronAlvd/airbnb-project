import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import LoginFormModal from '../../LoginFormModal/LoginFormModal';
import SignupFormModal from '../../SignUp/SignUpForm';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const liveUser = useSelector(state => state.session.user)

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = () => {
    if (showMenu && liveUser) {
      return (
        <ul className="UL-ModalButton-loggedIn" ref={ulRef}>
          <li className={showMenu ? "ModalButton-list pbl-top" : null}><p className="userInfo">{liveUser.username}</p></li>
          <li className={showMenu ? "ModalButton-list" : null}><p className="userInfo">{liveUser.firstName} {liveUser.lastName}</p></li>
          <li className={showMenu ? "ModalButton-list" : null}><p className="userInfo">{liveUser.email}</p></li>
          <li className={showMenu ? "ModalButton-list pbl-bottom" : null}>
            <button onClick={logout} className="pb-logout userInfo">Log Out</button>
          </li>
          <li className={showMenu ? "ModalButton-list" : null}><NavLink to="/spotformpage"><p className="userInfo">Create Spot</p></NavLink></li>
        </ul>
      )
    } else if (showMenu && !liveUser) {
      return (
        <ul className="UL-ModalButton">
          <li className="ModalButton-list pbl-top">
            <OpenModalButton className="ModalButton" buttonText="Log In" modalComponent={<LoginFormModal/>}/>
          </li>
          <li className="ModalButton-list pbl-bottom">
            <OpenModalButton className="ModalButton" buttonText="Sign Up" modalComponent={<SignupFormModal/>}/>
          </li>
        </ul>
      )
    }
  };

  return (
    <>
      <button onClick={toggleMenu} className="button-FaUser">
        <FaUserCircle className="FaUserCircle"/>
      </button>
      {showMenu && ulClassName()}
    </>
  );
}

export default ProfileButton;