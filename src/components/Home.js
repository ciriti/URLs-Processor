import React, { useState } from 'react';
import Input from './form/URLInput';

const Home = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ url })
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}api/urls`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        setMessage('URL added successfully!');
        setUrl(''); // Clear the input field
      } else {
        setMessage('Failed to add URL.');
      }
    } catch (error) {
      setMessage('Failed to add URL.');
      console.error(error);
    }
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
