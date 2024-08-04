import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useApi } from '../../context/ApiContext';
import Swal from 'sweetalert2';

const URLDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchUrl } = useApi();
  const { jwtToken } = useOutletContext();
  const navigate = useNavigate();

  const fetchData = useCallback(
    (isPeriodic = false) => {
      console.log('refresh');
      fetchUrl(id, jwtToken)
        .then(response => {
          setDetails(response.data);
          setLoading(false);
          console.log('Data refreshed');
        })
        .catch(error => {
          setLoading(false); // Ensure loading is set to false on error
          const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
          setError(errorMsg);
          if (!isPeriodic) {
            Swal.fire({
              title: 'Error!',
              text: errorMsg,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
          if (error.response?.status === 401) {
            navigate('/'); // Redirect to home if unauthorized
          }
        });
    },
    [id, jwtToken, fetchUrl, navigate]
  );

  useEffect(() => {
    if (!jwtToken) {
      navigate('/');
    } else {
      setLoading(true);
      fetchData();
    }

    const interval = setInterval(() => fetchData(true), 2000);

    return () => clearInterval(interval);
  }, [fetchData, jwtToken, navigate]);

  return (
    <div>
      <h2 className="text-center">URL Details</h2>
      <hr />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {details && (
        <div>
          <p>
            <strong>ID:</strong> {details.id}
          </p>
          <p>
            <strong>URL:</strong> {details.url}
          </p>
          <p>
            <strong>Status:</strong> {details.state}
          </p>
          {details.processed_data ? (
            <div>
              <h3>Results:</h3>
              <p>
                <strong>HTML Version:</strong> {details.processed_data.html_version}
              </p>
              <p>
                <strong>Page Title:</strong> {details.processed_data.page_title}
              </p>
              <p>
                <strong>Headings Count:</strong>{' '}
                {Object.keys(details.processed_data.heading_tags_count).length === 0 ? '0' : ''}
              </p>
              <ul>
                {Object.entries(details.processed_data.heading_tags_count).map(([level, count]) => (
                  <li key={level}>
                    {level}: {count}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Internal Links:</strong> {details.processed_data.internal_links}
              </p>
              <p>
                <strong>External Links:</strong> {details.processed_data.external_links}
              </p>
              <p>
                <strong>Inaccessible Links:</strong> {details.processed_data.inaccessible_links}
              </p>
              <p>
                <strong>Login Form Present:</strong>{' '}
                {details.processed_data.has_login_form ? 'Yes' : 'No'}
              </p>
            </div>
          ) : (
            <div>No processed data available for this URL.</div>
          )}
        </div>
      )}
      {!loading && !error && !details && <div>No details found for this URL.</div>}
    </div>
  );
};

export default URLDetails;
