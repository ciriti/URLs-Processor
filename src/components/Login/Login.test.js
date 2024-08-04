import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import Login from './Login';
import { useApi } from '../../context/ApiContext';

jest.mock('../../context/ApiContext', () => ({
  useApi: jest.fn()
}));

const mockNavigate = jest.fn();
const mockSetJwtToken = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useOutletContext: () => ({ setJwtToken: mockSetJwtToken })
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const mockAuthenticate = jest.fn();

beforeEach(() => {
  useApi.mockReturnValue({
    authenticate: mockAuthenticate
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders Login component', () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();

  expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();

  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
});

test('handles successful login', async () => {
  const mockToken = 'mockToken';
  mockAuthenticate.mockResolvedValueOnce({
    data: { token: mockToken }
  });

  render(
    <Router>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByLabelText(/Username/i), {
    target: { value: 'testuser' }
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: 'testpass' }
  });

  fireEvent.click(screen.getByRole('button', { name: /Login/i }));

  await waitFor(() => {
    expect(mockAuthenticate).toHaveBeenCalledWith('testuser', 'testpass');
  });

  await waitFor(() => {
    expect(mockSetJwtToken).toHaveBeenCalledWith(mockToken);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

test('handles login error', async () => {
  const errorMessage = 'Network Error';
  mockAuthenticate.mockRejectedValueOnce(new Error(errorMessage));

  render(
    <Router>
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByLabelText(/Username/i), {
    target: { value: 'testuser' }
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: 'testpass' }
  });

  fireEvent.click(screen.getByRole('button', { name: /Login/i }));

  await waitFor(() => {
    expect(mockAuthenticate).toHaveBeenCalledWith('testuser', 'testpass');
  });

  await waitFor(() => {
    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  });
});
