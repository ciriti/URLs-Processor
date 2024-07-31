import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import URLs from './components/URLs';
import URLDetails from './components/URLDetails';
import Login from './components/Login';
import { ApiProvider } from './context/ApiContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/urls',
        element: <URLs />
      },
      {
        path: 'urls/:id',
        element: <URLDetails />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  </React.StrictMode>
);
