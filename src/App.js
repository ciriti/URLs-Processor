import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useApi } from './context/ApiContext';
import Swal from 'sweetalert2';

function App() {
  const [jwtToken, setJwtToken] = useState(() => {
    return localStorage.getItem('jwtToken') || '';
  });
  const { logout } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('jwtToken', jwtToken);
  }, [jwtToken]);

  const logOut = () => {
    logout()
      .then(response => {
        const data = response.data;
        if (data.error) {
          console.log(data);
        } else {
          setJwtToken('');
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
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">URLs Processor</h1>
        </div>
        <div className="col text-end">
          {jwtToken && (
            <a href="#!" onClick={logOut}>
              <span className="badge bg-danger">Logout</span>
            </a>
          )}
        </div>
        <hr className="mb-3"></hr>
      </div>

      {jwtToken && (
        <div className="row">
          <div className="col-md-2">
            <nav>
              <div className="list-group">
                <Link to="/" className="list-group-item list-group-item-action">
                  Add URLs
                </Link>
                <Link to="/urls" className="list-group-item list-group-item-action">
                  URLs
                </Link>
              </div>
            </nav>
          </div>
          <div className="col-md-10">
            <Outlet
              context={{
                jwtToken,
                setJwtToken
              }}
            />
          </div>
        </div>
      )}

      {!jwtToken && (
        <Outlet
          context={{
            jwtToken,
            setJwtToken
          }}
        />
      )}
    </div>
  );
}

export default App;
