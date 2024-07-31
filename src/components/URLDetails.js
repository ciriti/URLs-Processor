import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const URLDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}api/urls/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch URL details');
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

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
            <strong>Status:</strong> {details.status}
          </p>
          <h3>Results:</h3>
          <p>
            <strong>HTML Version:</strong> {details.results.html_version}
          </p>
          <p>
            <strong>Page Title:</strong> {details.results.page_title}
          </p>
          <p>
            <strong>Headings Count:</strong>
          </p>
          <ul>
            {Object.entries(details.results.headings).map(([level, count]) => (
              <li key={level}>
                {level}: {count}
              </li>
            ))}
          </ul>
          <p>
            <strong>Internal Links:</strong> {details.results.links.internal}
          </p>
          <p>
            <strong>External Links:</strong> {details.results.links.external}
          </p>
          <p>
            <strong>Inaccessible Links:</strong> {details.results.links.inaccessible}
          </p>
          <p>
            <strong>Login Form Present:</strong> {details.results.login_form_present ? 'Yes' : 'No'}
          </p>
        </div>
      )}
      {!loading && !error && !details && <div>No details found for this URL.</div>}
    </div>
  );
};

export default URLDetails;
