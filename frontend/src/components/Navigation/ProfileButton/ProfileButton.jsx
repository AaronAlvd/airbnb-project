import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import LoginFormModal from "../../LoginFormModal/LoginFormModal";
import SignupFormModal from "../../SignUp/SignUpForm";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../../store/session";
import "./ProfileButton.css";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const liveUser = useSelector((state) => state.session.user);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    setShowMenu(false);
    navigate("/");
    dispatch(sessionActions.logout());
  };

  const ulClassName = () => {
    if (showMenu && liveUser) {
      return (
        <ul className="UL-ModalButton-loggedIn" ref={ulRef}>
          <li className="ModalButton-list">
            Hello, {liveUser?.firstName || "User"}
          </li>
          <li className="ModalButton-list pbl-top">
            <p className="userInfo">{liveUser?.username}</p>
          </li>
          <li className="ModalButton-list">
            <p className="userInfo">
              {liveUser?.firstName} {liveUser?.lastName}
            </p>
          </li>
          <li className="ModalButton-list">
            <p className="userInfo">{liveUser?.email}</p>
          </li>
          <li className="ModalButton-list pbl-bottom">
            <button onClick={logout} className="pb-logout userInfo">
              Log Out
            </button>
          </li>
          <li id="createspotmenu" className="ModalButton-list">
            <NavLink to="/spotformpage">
              <p className="userInfo">Create Spot</p>
            </NavLink>
          </li>
        </ul>
      );
    } else if (showMenu && !liveUser) {
      return (
        <ul className="UL-ModalButton">
          {" "}
          <li  className="ModalButton-list pbl-bottom">
            <OpenModalButton
              className="ModalButton"
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </li>
          <li id="loginmenu" className="ModalButton-list pbl-top">
            <OpenModalButton
              className="ModalButton"
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />
          </li>
        </ul>
      );
    }
  };

  return (
    <div className="tester">
      <button
        onClick={toggleMenu}
        className="button-FaUser"
        aria-haspopup="true"
        aria-expanded={showMenu}
      >
        <FaUserCircle className="FaUserCircle" />
      </button>
      {showMenu && ulClassName()}
    </div>
  );
}

export default ProfileButton;
