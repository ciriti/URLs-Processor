import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../context/ApiContext';

const AddURLs = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { addUrl } = useApi();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    addUrl(url)
      .then(() => {
        setMessage('URL added successfully!');
        setUrl('');
        navigate('/urls');
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        setMessage('Failed to add URL.');
        // console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="text-center">
        <h2>Add URL</h2>
        <hr />
      </div>
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="url" className="form-label">
                URL
              </label>
              <input
                type="url"
                className="form-control"
                id="url"
                name="url"
                placeholder="Enter URL"
                value={url}
                onChange={e => setUrl(e.target.value)}
                autoComplete="off"
                disabled={loading}
              />
              {message.includes('Failed') && <div className="text-danger">{message}</div>}
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add URL
            </button>
          </form>
          {message && !message.includes('Failed') && <p className="mt-3 text-success">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default AddURLs;
