import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Input from './form/Input';
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
        <Input
          title="Email Address"
          type="email"
          className="form-control"
          name="email"
          autoComplete="email-new"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <Input
          title="Password"
          type="password"
          className="form-control"
          name="password"
          autoComplete="password-new"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <hr />
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </div>
  );
};

export default Login;
