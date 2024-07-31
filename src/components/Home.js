import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Input from './form/URLInput';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ url })
    };

    fetch(`${process.env.REACT_APP_BACKEND}api/urls`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add URL.');
        }
        return response.json();
      })
      .then(data => {
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
        console.error(err);
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
            <Input
              type="url"
              className="form-control"
              name="url"
              title="URL"
              placeholder="Enter URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
              autoComplete="off"
              errorDiv="text-danger"
              errorMsg={message.includes('Failed') ? message : ''}
            />
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

export default Home;
