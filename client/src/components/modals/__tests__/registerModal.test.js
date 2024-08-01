import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterModal from '../registerModal';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../..reducers'; 
import { jest } from '@jest/globals';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

jest.mock('../../hooks/useLoginModel', () => ({
  default: () => ({
    onOpen: jest.fn(),
    onClose: jest.fn(),
    isOpen: false,
  }),
}));

jest.mock('../../hooks/useRegisterModel', () => ({
  default: () => ({
    onOpen: jest.fn(),
    onClose: jest.fn(),
    isOpen: true,
  }),
}));

jest.mock('../../actions/auth', () => ({
  signUp: jest.fn(),
}));

const store = createStore(rootReducer);

describe('RegisterModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the modal and form fields', () => {
    render(
      <Provider store={store}>
        <RegisterModal />
      </Provider>
    );

    expect(screen.getByText(/Create An Account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
  });

  test('toggles to login modal on click', () => {
    const mockOnOpen = jest.fn();
    const mockOnClose = jest.fn();
    
    jest.mock('../../hooks/useLoginModel', () => ({
      default: () => ({
        onOpen: mockOnOpen,
        onClose: mockOnClose,
        isOpen: false,
      }),
    }));

    render(
      <Provider store={store}>
        <RegisterModal />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Sign in/i));
    
    expect(mockOnOpen).toHaveBeenCalled();
  });

  test('submits the form with correct data', async () => {
    const mockSignUp = jest.fn();
    jest.mock('../../actions/auth', () => ({
      signUp: mockSignUp,
    }));

    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      useNavigate: () => mockNavigate,
    }));

    render(
      <Provider store={store}>
        <RegisterModal />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/Register/i));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        confirmPassword: 'password123',
        name: 'Test User',
      }, mockNavigate, expect.anything());
    });
  });

  test('disables form fields when loading', () => {
    render(
      <Provider store={store}>
        <RegisterModal />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'password123' } });

    expect(screen.getByPlaceholderText(/Email/i)).toBeEnabled();
    expect(screen.getByPlaceholderText(/Name/i)).toBeEnabled();
    expect(screen.getByPlaceholderText(/Username/i)).toBeEnabled();
    expect(screen.getByPlaceholderText(/Password/i)).toBeEnabled();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeEnabled();

    fireEvent.click(screen.getByText(/Register/i));

    expect(screen.getByPlaceholderText(/Email/i)).toBeDisabled();
    expect(screen.getByPlaceholderText(/Name/i)).toBeDisabled();
    expect(screen.getByPlaceholderText(/Username/i)).toBeDisabled();
    expect(screen.getByPlaceholderText(/Password/i)).toBeDisabled();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeDisabled();
  });
});