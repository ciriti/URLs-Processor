import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useApi } from '../../context/ApiContext';

const AddURLs = () => {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { addUrls } = useApi();
  const navigate = useNavigate();
  const { jwtToken } = useOutletContext();

  const handleAddUrl = e => {
    e.preventDefault();
    setUrls([...urls, url]);
    setUrl('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    addUrls(urls, jwtToken)
      .then(() => {
        setMessage('URLs added successfully!');
        setUrls([]);
        navigate('/urls');
      })
      .catch(err => {
        const message = err.response && err.response.data ? err.response.data : null;
        Swal.fire({
          title: 'Error!',
          text: `Failed to add urls: ${message ?? err.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="text-center">
        <h2>Add URLs</h2>
        <hr />
      </div>
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleAddUrl}>
            <div className="mb-3">
              <label htmlFor="url" className="form-label">
                URL
              </label>
              <input
                type="url"
                className="form-control"
                id="url"
                name="url"
                placeholder="Enter URL (e.g., http://example.com)"
                value={url}
                onChange={e => setUrl(e.target.value)}
                autoComplete="off"
                disabled={loading}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
              Add URL
            </button>
          </form>
          {message && !message.includes('Failed') && <p className="mt-3 text-success">{message}</p>}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <h4>URLs to be uploaded</h4>
          <ul className="list-group">
            {urls.map((url, index) => (
              <li key={index} className="list-group-item">
                {url}
              </li>
            ))}
          </ul>
          {urls.length > 0 && (
            <button onClick={handleSubmit} className="btn btn-success mt-3" disabled={loading}>
              Upload All URLs
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddURLs;
