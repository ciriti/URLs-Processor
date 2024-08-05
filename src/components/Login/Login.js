import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useApi } from '../../context/ApiContext';
import Swal from 'sweetalert2';

const Login = () => {
  const [user, setUser] = useState(process.env.REACT_APP_USER_DEV);
  const [pass, setPass] = useState(process.env.REACT_APP_PASS_DEV);

  const { setJwtToken } = useOutletContext();
  const navigate = useNavigate();
  const { authenticate } = useApi();

  const handleSubmit = event => {
    event.preventDefault();

    authenticate(user, pass)
      .then(response => {
        const data = response.data;
        if (data.error) {
          console.log(data);
        } else {
          setJwtToken(data.token);
          navigate('/');
        }
      })
      .catch(error => {
        const message = error.response && error.response.data ? error.response.data.message : null;
        Swal.fire({
          title: 'Error!',
          text: message,
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
          <label htmlFor="user" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="user"
            name="user"
            autoComplete="username"
            value={user}
            onChange={event => setUser(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="pass"
            name="pass"
            autoComplete="current-password"
            value={pass}
            onChange={event => setPass(event.target.value)}
          />
        </div>
        <hr />
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </div>
  );
};

export default Login;
