import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ApiContext = createContext();

const BASE_URL = process.env.REACT_APP_BACKEND;

export const ApiProvider = ({ children }) => {
  const addUrl = url => {
    return axios.post(
      `${BASE_URL}api/urls`,
      { url },
      { headers: { 'Content-Type': 'application/json' } }
    );
  };

  const fetchUrls = () => {
    // Simulate fetching from the backend by using a timeout
    return new Promise(resolve => {
      setTimeout(() => {
        const fakeUrls = [
          { id: 1, url: 'http://example.com', status: 'pending' },
          { id: 2, url: 'http://example.org', status: 'processing' },
          { id: 3, url: 'http://example.net', status: 'stopped' }
        ];
        resolve({ data: fakeUrls });
      }, 1000);
    });
  };

  const startProcessing = id => {
    return axios.post(`${BASE_URL}api/urls/${id}/start`);
  };

  const stopProcessing = id => {
    return axios.post(`${BASE_URL}api/urls/${id}/stop`);
  };

  const authenticate = (user, pass) => {
    return axios.post(
      `${BASE_URL}/authenticate`,
      { user, pass },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
  };

  return (
    <ApiContext.Provider
      value={{ addUrl, fetchUrls, startProcessing, stopProcessing, authenticate }}>
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useApi = () => useContext(ApiContext);
