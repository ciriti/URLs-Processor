import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const URLs = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    // Simulate fetching from the backend by using a timeout
    setTimeout(() => {
      const fakeUrls = [
        { id: 1, url: 'http://example.com', status: 'pending' },
        { id: 2, url: 'http://example.org', status: 'processing' },
        { id: 3, url: 'http://example.net', status: 'stopped' }
      ];
      setUrls(fakeUrls);
      console.log('refresh');
    }, 1000);
  };

  useEffect(() => {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    // const requestOptions = {
    //   method: 'GET',
    //   headers: headers
    // };

    // fetch(`${process.env.REACT_APP_BACKEND}api/urls`, requestOptions)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch URLs');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     setUrls(data);
    //   })
    //   .catch(err => {
    //     Swal.fire({
    //       title: 'Error!',
    //       text: err.message,
    //       icon: 'error',
    //       confirmButtonText: 'OK'
    //     });
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    // setTimeout(() => {
    //   const fakeUrls = [
    //     { id: 1, url: 'http://example.com', status: 'pending' },
    //     { id: 2, url: 'http://example.org', status: 'processing' },
    //     { id: 3, url: 'http://example.net', status: 'stopped' }
    //   ];
    //   setUrls(fakeUrls);
    //   setLoading(false);
    // }, 1000);
    setLoading(true);
    fetchData();
    setLoading(false);
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStart = id => {
    const requestOptions = {
      method: 'POST'
    };

    fetch(`${process.env.REACT_APP_BACKEND}api/urls/${id}/start`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to start processing');
        }
        setUrls(urls.map(url => (url.id === id ? { ...url, status: 'processing' } : url)));
      })
      .catch(err => {
        console.error('Failed to start processing:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to start processing: ' + err.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  const handleStop = id => {
    const requestOptions = {
      method: 'POST'
    };

    fetch(`${process.env.REACT_APP_BACKEND}api/urls/${id}/stop`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to stop processing');
        }
        setUrls(urls.map(url => (url.id === id ? { ...url, status: 'stopped' } : url)));
      })
      .catch(err => {
        console.error('Failed to stop processing:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to stop processing: ' + err.message,
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
    </>
  );
};

export default URLs;
