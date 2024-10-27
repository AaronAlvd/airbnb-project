import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import LoginFormModal from '../../LoginFormModal/LoginFormModal';
import SignupFormModal from '../../SignUp/SignUpForm';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../../store/session';
import './ProfileButton.css'

function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const ulRef02 = useRef();
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
      if (ulRef02.current && !ulRef02.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/');
  };

  const ulClassName = () => {
    if (showMenu && liveUser) {
      return (
        <ul className="UL-ModalButton-loggedIn" ref={ulRef}>
          <li className={showMenu ? "ModalButton-list pbl-top" : null}><p className="userInfo">{liveUser.username}</p></li>
          <li className={showMenu ? "ModalButton-list" : null}><p className="userInfo">Hello, {liveUser.firstName} {liveUser.lastName}</p></li>
          <li className={showMenu ? "ModalButton-list" : null}><p className="userInfo">{liveUser.email}</p></li>
          <li className={showMenu ? "ModalButton-list pbl-bottom" : null}>
            <button onClick={logout} className="pb-logout userInfo">Log Out</button>
          </li>
          <li className={showMenu ? "ModalButton-list pbl-bottom" : null} onClick={() => navigate('/spots/current')}>
            <button className="pb-logout userInfo">Manage Spots</button>
          </li>
          <li className={showMenu ? "ModalButton-list pbl-bottom" : null} onClick={() => navigate('/reviews/current')}>
            <button className="pb-logout userInfo">Manage Reviews</button>
          </li>
        </ul>
      )
    } else if (showMenu && !liveUser) {
      return (
        <ul className="UL-ModalButton" ref={ulRef02}>
          <li className={showMenu ? "ModalButton-list pbl-top" : null}>
            <OpenModalButton className="ModalButton" buttonText="Sign Up" modalComponent={<SignupFormModal/>}/>
          </li>
          <li className={showMenu ? "ModalButton-list pbl-bottom" : null}>
            <OpenModalButton className="ModalButton" buttonText="Log In" modalComponent={<LoginFormModal/>}/>
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