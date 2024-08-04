import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import AddURLs from './AddURLs';
import { useApi } from '../context/ApiContext';

// Mock useApi hook
jest.mock('../context/ApiContext', () => ({
  useApi: jest.fn()
}));

// Mock useNavigate hook and useOutletContext hook
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useOutletContext: () => ({ jwtToken: 'mockToken' })
}));

// Mock Swal
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const mockAddUrls = jest.fn();

beforeEach(() => {
  useApi.mockReturnValue({
    addUrls: mockAddUrls
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders AddURLs component', () => {
  render(
    <Router>
      <AddURLs />
    </Router>
  );

  // Check for the heading
  expect(screen.getByRole('heading', { name: /Add URLs/i })).toBeInTheDocument();

  // Check for the button
  expect(screen.getByRole('button', { name: /Add URL/i })).toBeInTheDocument();
});

test('handles URL submission error', async () => {
  // Mock an error response structure
  mockAddUrls.mockRejectedValueOnce({
    response: {
      data: 'Network Error'
    }
  });

  render(
    <Router>
      <AddURLs />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/Enter URL/i), {
    target: { value: 'http://example.com' }
  });

  fireEvent.click(screen.getByRole('button', { name: /Add URL/i }));

  fireEvent.click(screen.getByRole('button', { name: /Upload All URLs/i }));

  await waitFor(() => {
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error!',
      text: 'Failed to add urls: Network Error',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  });
});

test('handles successful URL submission', async () => {
  mockAddUrls.mockResolvedValueOnce(); // Ensure addUrls resolves successfully

  render(
    <Router>
      <AddURLs />
    </Router>
  );

  // Add URLs
  fireEvent.change(screen.getByPlaceholderText(/Enter URL/i), {
    target: { value: 'http://example.com' }
  });

  fireEvent.click(screen.getByRole('button', { name: /Add URL/i }));

  fireEvent.change(screen.getByPlaceholderText(/Enter URL/i), {
    target: { value: 'http://example.org' }
  });

  fireEvent.click(screen.getByRole('button', { name: /Add URL/i }));

  // Submit URLs
  fireEvent.click(screen.getByRole('button', { name: /Upload All URLs/i }));

  await waitFor(() => {
    expect(mockAddUrls).toHaveBeenCalledWith(
      ['http://example.com', 'http://example.org'],
      'mockToken'
    );
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/urls');
  });
});
