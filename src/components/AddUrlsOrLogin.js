import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AddURLs from './AddURLs';
import Login from './Login';

const AddUrlsOrLogin = () => {
  const { jwtToken } = useOutletContext();

  return jwtToken ? <AddURLs /> : <Login />;
};

export default AddUrlsOrLogin;
