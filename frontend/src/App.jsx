import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation/Navigation';
import SpotsDisplayAll from './components/Spots/SpotsDisplayAll';
import Spot from './components/Spots/SpotDisplay/Spot';
import SpotFormPage from './components/Spots/SpotFormPage/SpotFormPage';
import ManageSpots from './components/Spots/ManageSpots/ManageSpots';
import ManageReviews from './components/Reviews/ManageReviews/ManageReviews';
import EditSpots from './components/Spots/EditSpots/EditSpots';
import * as sessionActions from './store/session';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsDisplayAll />
      },
      {
        path: 'spots/:spotId',
        element: <Spot />
      },
      {
        path: '/spotformpage',
        element: <SpotFormPage />
      },
      {
        path: '/spots/current',
        element: <ManageSpots />
      },
      {
        path: '/reviews/current',
        element: <ManageReviews />
      },
      {
        path: '/updatespotform',
        element: <EditSpots />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
