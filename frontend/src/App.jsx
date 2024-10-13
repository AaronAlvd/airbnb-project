import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation/Navigation';
import SpotsDisplayAll from './components/Spots/SpotsDisplayAll/SpotsDisplayAll';
import Spot from './components/Spots/Spot/Spot';
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
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
