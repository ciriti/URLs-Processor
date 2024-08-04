import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import AddUrlsOrLogin from './AddUrlsOrLogin';
import { useOutletContext } from 'react-router-dom';

// Mock useOutletContext hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn()
}));

// Mock child components
jest.mock('./AddURLs', () => {
  const AddURLs = () => <div>Add URLs Component</div>;
  AddURLs.displayName = 'AddURLs';
  return AddURLs;
});

jest.mock('./Login', () => {
  const Login = () => <div>Login Component</div>;
  Login.displayName = 'Login';
  return Login;
});

describe('AddUrlsOrLogin component', () => {
  it('renders AddURLs component when jwtToken is present', () => {
    useOutletContext.mockReturnValue({ jwtToken: 'mockToken' });

    render(
      <Router>
        <AddUrlsOrLogin />
      </Router>
    );

    expect(screen.getByText('Add URLs Component')).toBeInTheDocument();
    expect(screen.queryByText('Login Component')).not.toBeInTheDocument();
  });

  it('renders Login component when jwtToken is absent', () => {
    useOutletContext.mockReturnValue({ jwtToken: null });

    render(
      <Router>
        <AddUrlsOrLogin />
      </Router>
    );

    expect(screen.getByText('Login Component')).toBeInTheDocument();
    expect(screen.queryByText('Add URLs Component')).not.toBeInTheDocument();
  });
});
