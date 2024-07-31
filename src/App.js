import React, { useState } from 'react';

import { Link, Outlet } from 'react-router-dom';

function App() {
  const [jwtToken, setJwtToken] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertClassName, setAlertClassName] = useState('d-none');

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">URLs Processor</h1>
        </div>
        <div className="col text-end">
          <Link to="/login">
            <span className="badge bg-success">Login</span>
          </Link>
        </div>
        <hr className="mb-3"></hr>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">
                Home
              </Link>
              <Link to="/urls" className="list-group-item list-group-item-action">
                URLs
              </Link>
              <Link to="/urls/0" className="list-group-item list-group-item-action">
                Details
              </Link>
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertClassName,
              setAlertMessage
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
