import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../navbar';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../..reducers'; 

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(() => ({ exp: Math.floor(Date.now() / 1000) + 3600 })), 
}));

jest.mock('../../hooks/useLoginModel', () => ({
  default: () => ({
    onOpen: jest.fn(),
  }),
}));

jest.mock('../../hooks/usePostModel', () => ({
  default: () => ({
    onOpen: jest.fn(),
  }),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

const store = createStore(rootReducer);

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders the navbar correctly', () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Messages/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Profile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Post/i })).toBeInTheDocument();
  });

  test('shows login modal when clicking on login button', () => {
    const mockOnOpen = jest.fn();
    jest.mock('../../hooks/useLoginModel', () => ({
      default: () => ({
        onOpen: mockOnOpen,
      }),
    }));

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));
    expect(mockOnOpen).toHaveBeenCalled();
  });

  test('logs out and redirects to home', () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();
    jest.mock('react-redux', () => ({
      useDispatch: () => mockDispatch,
    }));
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));

    localStorage.setItem('profile-tabletop', JSON.stringify({ result: { username: 'testuser' }, token: 'fake-token' }));

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Log out/i }));
    
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGOUT' });
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockNavigate).toHaveBeenCalledWith(0); 
  });

  test('opens post modal if user is logged in', () => {
    const mockOnOpen = jest.fn();
    jest.mock('../../hooks/usePostModel', () => ({
      default: () => ({
        onOpen: mockOnOpen,
      }),
    }));

    localStorage.setItem('profile-tabletop', JSON.stringify({ result: { username: 'testuser' }, token: 'fake-token' }));

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Post/i }));
    expect(mockOnOpen).toHaveBeenCalled();
  });

  test('opens login modal if user is not logged in when clicking post', () => {
    const mockOnOpenLogin = jest.fn();
    const mockOnOpenPost = jest.fn();
    jest.mock('../../hooks/useLoginModel', () => ({
      default: () => ({
        onOpen: mockOnOpenLogin,
      }),
    }));
    jest.mock('../../hooks/usePostModel', () => ({
      default: () => ({
        onOpen: mockOnOpenPost,
      }),
    }));

    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Post/i }));
    expect(mockOnOpenLogin).toHaveBeenCalled();
    expect(mockOnOpenPost).not.toHaveBeenCalled();
  });
});