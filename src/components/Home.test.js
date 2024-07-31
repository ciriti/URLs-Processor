import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useApi } from '../context/ApiContext';
import Home from './Home';
import '@testing-library/jest-dom';

// Mock useApi hook
jest.mock('../context/ApiContext', () => ({
  useApi: jest.fn()
}));

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

const mockAddUrl = jest.fn();
const mockNavigate = jest.fn();

beforeEach(() => {
  useApi.mockReturnValue({
    addUrl: mockAddUrl
  });
  require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders Home component', () => {
  render(
    <Router>
      <Home />
    </Router>
  );

  // Check for the heading
  expect(screen.getByRole('heading', { name: /Add URL/i })).toBeInTheDocument();

  // Check for the button
  expect(screen.getByRole('button', { name: /Add URL/i })).toBeInTheDocument();
});

test('handles form submission error', async () => {
  mockAddUrl.mockRejectedValueOnce(new Error('Network Error'));

  render(
    <Router>
      <Home />
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText(/Enter URL/i), {
    target: { value: 'http://example.com' }
  });

  fireEvent.click(screen.getByRole('button', { name: /Add URL/i }));

  await waitFor(() => {
    expect(mockAddUrl).toHaveBeenCalledWith('http://example.com');
    expect(screen.getByText(/Failed to add URL./i)).toBeInTheDocument();
    expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
  });
});
