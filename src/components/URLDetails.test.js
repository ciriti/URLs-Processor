import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import URLDetails from './URLDetails';
import { useApi } from '../context/ApiContext';

jest.mock('../context/ApiContext', () => ({
  useApi: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useOutletContext: () => ({ jwtToken: 'mockToken' })
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const mockFetchUrl = jest.fn();

beforeEach(() => {
  useApi.mockReturnValue({
    fetchUrl: mockFetchUrl
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders URLDetails component and displays loading state', async () => {
  mockFetchUrl.mockResolvedValueOnce({
    data: {
      id: '1',
      url: 'http://example.com',
      state: 'Completed',
      processed_data: {
        html_version: 'HTML5',
        page_title: 'Example Page',
        heading_tags_count: { h1: 1, h2: 2 },
        internal_links: 3,
        external_links: 4,
        inaccessible_links: 0,
        has_login_form: true
      }
    }
  });

  await act(async () => {
    render(
      <Router>
        <URLDetails />
      </Router>
    );
  });

  await waitFor(() => {
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });
});

test('handles error during data fetch', async () => {
  mockFetchUrl.mockRejectedValueOnce({
    response: {
      data: { message: 'Failed to fetch data' }
    }
  });

  await act(async () => {
    render(
      <Router>
        <URLDetails />
      </Router>
    );
  });

  await waitFor(() => {
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error!',
      text: 'Failed to fetch data',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
  });
});
