import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Album } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/album',
    element: <Album />,
  },
]);

const Routes: React.FC<{}> = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
