import { NavLink } from 'react-router-dom';
import { ProfileButton } from '../ProfileButton';
import './Navigation.css'


function Navigation() {

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
      <div className="logo">
        
      </div>
      <div className="div-ul">
        <ul className="nav-ul">
          <li className="nav-li">
            <NavLink to="/"><img id="logo" src="/edubnblogo.png" alt="EduBnB Logo" /></NavLink>
          </li >

          <ProfileButton className="Profile"/>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
