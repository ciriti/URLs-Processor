import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useApi } from '../context/ApiContext';

const URLs = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchUrls, startProcessing, stopProcessing } = useApi();
  const { jwtToken } = useOutletContext();

  const fetchData = (isPeriodic = false) => {
    console.log('refresh');
    fetchUrls(jwtToken)
      .then(response => {
        const sortedUrls = response.data.sort((a, b) => a.id - b.id);
        setUrls(sortedUrls);
        setUrls(sortedUrls);
        console.log('Data refreshed');
      })
      .catch(error => {
        if (!isPeriodic) {
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
    const interval = setInterval(() => fetchData(true), 2000);

    return () => clearInterval(interval);
  }, []);

  const handleStart = id => {
    startProcessing(id, jwtToken)
      .then(response => {
        console.log(response.data);
        const { id, state } = response.data;
        setUrls(urls.map(url => (url.id === id ? { ...url, state } : url)));
      })
      .catch(err => {
        const { id, state, message } = err.response.data;
        setUrls(urls.map(url => (url.id === id ? { ...url, state } : url)));
        console.log(`start error ${err}`);
        Swal.fire({
          title: 'Error!',
          text: `Failed to start processing: ${message ?? err.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  const handleStop = id => {
    stopProcessing(id, jwtToken)
      .then(response => {
        console.log(`stop ok ${JSON.stringify(response.data, null, 2)}`);

        const { task_id, state } = response.data;
        setUrls(urls.map(url => (url.id === task_id ? { ...url, state } : url)));
      })
      .catch(err => {
        const { id, state, message } = err.response.data;
        setUrls(urls.map(url => (url.id === id ? { ...url, state } : url)));
        console.log(`stop error ${err}`);
        Swal.fire({
          title: 'Error!',
          text: `Failed to stop processing: ${message ?? err.message}`,
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
              <th>State</th>
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
                <td>{url.state}</td>
                <td>
                  <button onClick={() => handleStart(url.id)} className="btn btn-success btn-sm">
                    Start
                  </button>
                  {/* {url.state === 'pending' && (
                    <button onClick={() => handleStart(url.id)} className="btn btn-success btn-sm">
                      Start
                    </button>
                  )} */}
                  <button
                    onClick={() => handleStop(url.id)}
                    className="btn btn-danger btn-sm"
                    style={{ marginLeft: '5px' }}>
                    Stop
                  </button>
                  {/* {url.state === 'processing' && (
                    <button
                      onClick={() => handleStop(url.id)}
                      className="btn btn-danger btn-sm"
                      style={{ marginLeft: '5px' }}>
                      Stop
                    </button>
                  )} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default URLs;
