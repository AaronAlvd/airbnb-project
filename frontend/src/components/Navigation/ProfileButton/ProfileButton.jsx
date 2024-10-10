import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../../store/session';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  const ulClassName = showMenu ? "profile-dropdown" : " hidden";

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li className={showMenu ? "profileButton-list pbl-top" : null}>{user.username}</li>
        <li className={showMenu ? "profileButton-list" : null}>{user.firstName} {user.lastName}</li>
        <li className={showMenu ? "profileButton-list" : null}>{user.email}</li>
        <li className={showMenu ? "profileButton-list pbl-bottom" : null}>
          <button onClick={logout} className="pb-logout">Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;