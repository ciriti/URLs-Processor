import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import URLs from './components/URLs/URLs';
import URLDetails from './components/URLDetails/URLDetails';
import Login from './components/Login/Login';
import { ApiProvider } from './context/ApiContext';
import AddUrlsOrLogin from './components/AddUrlsOrLogin/AddUrlsOrLogin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AddUrlsOrLogin /> },
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
