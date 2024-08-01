import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom'; 
import LoginModal from '../loginModal';
import rootReducer from '../../reducers'; 


jest.mock('../../hooks/useLoginModel', () => ({
    __esModule: true,
    default: () => ({
        isOpen: true,
        onClose: jest.fn(),
    }),
}));

jest.mock('../../hooks/useRegisterModel', () => ({
    __esModule: true,
    default: () => ({
        onOpen: jest.fn(),
    }),
}));

jest.mock('../../actions/auth', () => ({
    signIn: jest.fn(() => (dispatch) => Promise.resolve()),
}));


const store = createStore(rootReducer);

describe('LoginModal component', () => {
    test('renders LoginModal correctly', () => {
        render(
            <Provider store={store}>
                <Router>
                    <LoginModal />
                </Router>
            </Provider>
        );


        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    });

    test('handles input changes and form submission', async () => {
        render(
            <Provider store={store}>
                <Router>
                    <LoginModal />
                </Router>
            </Provider>
        );

  
        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'password123' },
        });

    
        fireEvent.click(screen.getByText(/Sign In/i));

        await waitFor(() => {
       
            expect(require('../../actions/auth').signIn).toHaveBeenCalled();
        });
    });

    test('toggles to registration modal', () => {
        render(
            <Provider store={store}>
                <Router>
                    <LoginModal />
                </Router>
            </Provider>
        );

    
        const createAccountLink = screen.getByText(/Create an account/i);
        expect(createAccountLink).toBeInTheDocument();

      
        fireEvent.click(createAccountLink);

       
        expect(require('../../hooks/useRegisterModel').default().onOpen).toHaveBeenCalled();
    });
});