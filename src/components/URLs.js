import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const URLs = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}api/urls`);
        const data = await response.json();
        setUrls(data);
      } catch (error) {
        console.error('Failed to fetch URLs:', error);
      }
    };

    fetchUrls();
  }, []);

  const handleStart = async id => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND}api/urls/${id}/start`, { method: 'POST' });
      setUrls(urls.map(url => (url.id === id ? { ...url, status: 'processing' } : url)));
    } catch (error) {
      console.error('Failed to start processing:', error);
    }
  };

  const handleStop = async id => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND}api/urls/${id}/stop`, { method: 'POST' });
      setUrls(urls.map(url => (url.id === id ? { ...url, status: 'stopped' } : url)));
    } catch (error) {
      console.error('Failed to stop processing:', error);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2>URLs</h2>
        <hr />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(url => (
            <tr key={url.id}>
              <td>{url.id}</td>
              <td>
                <Link to={`/urls/${url.id}`}>{url.url}</Link>
              </td>
              <td>{url.status}</td>
              <td>
                {url.status === 'pending' && (
                  <button onClick={() => handleStart(url.id)} className="btn btn-success btn-sm">
                    Start
                  </button>
                )}
                {url.status === 'processing' && (
                  <button onClick={() => handleStop(url.id)} className="btn btn-danger btn-sm">
                    Stop
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default URLs;
