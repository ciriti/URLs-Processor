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

  const addUrls = (urls, token) => {
    return axios.post(
      `${BASE_URL}/api/urls`,
      { urls },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
  };

  const fetchUrls = token => {
    return axios.get(`${BASE_URL}/api/urls`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const fetchUrl = (id, token) => {
    return axios.get(`${BASE_URL}/api/url`, {
      params: { id },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const startProcessing = (id, token) => {
    return axios.post(
      `${BASE_URL}/api/start`,
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
  };

  const stopProcessing = (id, token) => {
    return axios.post(
      `${BASE_URL}/api/stop`,
      { id: id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );
  };

  const authenticate = (user, pass) => {
    return axios.post(
      `${BASE_URL}/authenticate`,
      { user, pass },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
  };

  const logout = () => {
    return axios.get(`${BASE_URL}/logout`, { withCredentials: true });
  };

  return (
    <ApiContext.Provider
      value={{
        addUrl,
        fetchUrls,
        startProcessing,
        stopProcessing,
        authenticate,
        logout,
        addUrls,
        fetchUrl
      }}>
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useApi = () => useContext(ApiContext);
