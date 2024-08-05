import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AddURLs from '../AddURLs/AddURLs';
import Login from '../Login/Login';

const AddUrlsOrLogin = () => {
  const { jwtToken } = useOutletContext();

  return jwtToken ? <AddURLs /> : <Login />;
};

export default AddUrlsOrLogin;
