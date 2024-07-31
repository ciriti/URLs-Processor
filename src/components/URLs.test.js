import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useApi } from '../context/ApiContext';
import URLs from './URLs';
import '@testing-library/jest-dom';

// Mock useApi hook
jest.mock('../context/ApiContext', () => ({
  useApi: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const mockFetchUrls = jest.fn();
const mockStartProcessing = jest.fn();
const mockStopProcessing = jest.fn();

beforeEach(() => {
  useApi.mockReturnValue({
    fetchUrls: mockFetchUrls,
    startProcessing: mockStartProcessing,
    stopProcessing: mockStopProcessing
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders URLs component and displays loading', () => {
  mockFetchUrls.mockResolvedValueOnce({ data: [] });

  render(
    <Router>
      <URLs />
    </Router>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('renders URLs component and displays fetched URLs', async () => {
  const fakeUrls = [
    { id: 1, url: 'http://example.com', status: 'pending' },
    { id: 2, url: 'http://example.org', status: 'processing' },
    { id: 3, url: 'http://example.net', status: 'stopped' }
  ];

  mockFetchUrls.mockResolvedValueOnce({ data: fakeUrls });

  render(
    <Router>
      <URLs />
    </Router>
  );

  await waitFor(() => {
    fakeUrls.forEach(url => {
      expect(screen.getByText(url.url)).toBeInTheDocument();
      expect(screen.getByText(url.status)).toBeInTheDocument();
    });
  });
});

test('handles start button click', async () => {
  const fakeUrls = [{ id: 1, url: 'http://example.com', status: 'pending' }];

  mockFetchUrls.mockResolvedValueOnce({ data: fakeUrls });
  mockStartProcessing.mockResolvedValueOnce({});

  render(
    <Router>
      <URLs />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText(fakeUrls[0].url)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/Start/i));

  await waitFor(() => {
    expect(mockStartProcessing).toHaveBeenCalledWith(1);
    expect(screen.getByText('processing')).toBeInTheDocument();
  });
});

test('handles stop button click', async () => {
  const fakeUrls = [{ id: 1, url: 'http://example.com', status: 'processing' }];

  mockFetchUrls.mockResolvedValueOnce({ data: fakeUrls });
  mockStopProcessing.mockResolvedValueOnce({});

  render(
    <Router>
      <URLs />
    </Router>
  );

  await waitFor(() => {
    expect(screen.getByText(fakeUrls[0].url)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/Stop/i));

  await waitFor(() => {
    expect(mockStopProcessing).toHaveBeenCalledWith(1);
    expect(screen.getByText('stopped')).toBeInTheDocument();
  });
});

test('handles fetch URLs error', async () => {
  mockFetchUrls.mockRejectedValueOnce(new Error('Network Error'));

  render(
    <Router>
      <URLs />
    </Router>
  );

  await waitFor(() => {
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error!',
      text: 'Network Error',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument();
  });
});
