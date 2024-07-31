import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setJwtToken, toggleRefresh } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    const payload = {
      email: email,
      password: password
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    };

    fetch(`${process.env.REACT_APP_BACKEND}authenticate`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.log(data);
        } else {
          setJwtToken(data.access_token);
          toggleRefresh(true);
          navigate('/');
        }
      })
      .catch(error => {
        console.log(error.message);
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            autoComplete="email-new"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            autoComplete="password-new"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <hr />
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </div>
  );
};

export default Login;
