import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useApi } from '../context/ApiContext';

const URLs = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchUrls, startProcessing, stopProcessing } = useApi();

  const fetchData = () => {
    fetchUrls()
      .then(response => {
        setUrls(response.data);
        setLoading(false);
        console.log('refresh');
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    // const interval = setInterval(fetchData, 5000);

    // return () => clearInterval(interval);
  }, []);

  const handleStart = id => {
    startProcessing(id)
      .then(() => {
        setUrls(urls.map(url => (url.id === id ? { ...url, status: 'processing' } : url)));
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: `Failed to start processing: ${err.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  const handleStop = id => {
    stopProcessing(id)
      .then(() => {
        setUrls(urls.map(url => (url.id === id ? { ...url, status: 'stopped' } : url)));
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: `Failed to stop processing: ${err.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <>
      <div className="text-center">
        <h2>URLs</h2>
        <hr />
      </div>
      {loading && <div>Loading...</div>}
      {!loading && urls.length === 0 && <div>No URLs found.</div>}
      {!loading && urls.length > 0 && (
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
      )}
      {error && <div>Error: {error}</div>}
    </>
  );
};

export default URLs;
