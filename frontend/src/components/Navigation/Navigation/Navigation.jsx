import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileButton } from '../ProfileButton';
// import OpenModalButton from '../../OpenModalButton/OpenModalButton';
// import LoginFormModal from '../../LoginFormModal/LoginFormModal';
// import SignupFormModal from '../../SignUp/SignUpForm';
import * as sessionActions from '../../../store/session';
import './Navigation.css'
import { useEffect } from 'react';

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try{
        await dispatch(sessionActions.restoreUser())
      } catch(err) {

      }
    }
  }, [sessionUser])

  function logoClick() {
    navigate('/');
  }

  return (
    <div className="div-nav">
      <div className="logo">
        <img className="nav-logo" src="/GroundBNB24.jpg" onClick={logoClick}/>
      </div>
      <div className="div-ul">
        <ul className="nav-ul">
          { sessionUser ? <li className="nav-li"><NavLink to="/spotformpage"><p className="userInfo">Create a New Spot</p></NavLink></li> : null}
          <ProfileButton/>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;