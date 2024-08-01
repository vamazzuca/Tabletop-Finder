import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../..reducers'; 
import Sidebar from '../sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import { jest } from '@jest/globals';

jest.mock('../../hooks/useLoginModel', () => ({
    __esModule: true,
    default: () => ({
        onOpen: jest.fn()
    })
}));

jest.mock('../../hooks/usePostModel', () => ({
    __esModule: true,
    default: () => ({
        onOpen: jest.fn()
    })
}));

const mockStore = createStore(rootReducer);

describe('Sidebar Component', () => {
    test('renders Sidebar component correctly', () => {
        render(
            <Provider store={mockStore}>
                <Router>
                    <Sidebar />
                </Router>
            </Provider>
        );
        

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
    });

    test('shows correct sidebar tabs when user is logged in', () => {
        const user = {
            result: {
                username: 'testuser',
                photo: '/images/test.png',
                name: 'Test User'
            },
            token: 'valid-token'
        };
        
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(JSON.stringify(user));

        render(
            <Provider store={mockStore}>
                <Router>
                    <Sidebar />
                </Router>
            </Provider>
        );
        
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    test('calls onClickLogin when login button is clicked', () => {
        const mockOnClickLogin = jest.fn();
        jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);

        render(
            <Provider store={mockStore}>
                <Router>
                    <Sidebar />
                </Router>
            </Provider>
        );

        fireEvent.click(screen.getByText('Login'));

        expect(mockOnClickLogin).toHaveBeenCalled();
    });

    test('calls Logout when logout button is clicked', () => {
        const user = {
            result: {
                username: 'testuser',
                photo: '/images/test.png',
                name: 'Test User'
            },
            token: 'valid-token'
        };

        jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(JSON.stringify(user));
        const mockDispatch = jest.fn();
        jest.mock('react-redux', () => ({
            useDispatch: () => mockDispatch
        }));
        
        render(
            <Provider store={mockStore}>
                <Router>
                    <Sidebar />
                </Router>
            </Provider>
        );

        fireEvent.click(screen.getByText('Logout'));

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGOUT' });
    });

    test('displays PostButton correctly based on user state', () => {
        const user = {
            result: {
                username: 'testuser',
                photo: '/images/test.png',
                name: 'Test User'
            },
            token: 'valid-token'
        };

        jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(JSON.stringify(user));

        render(
            <Provider store={mockStore}>
                <Router>
                    <Sidebar />
                </Router>
            </Provider>
        );

        expect(screen.getByRole('button', { name: /Create Event/i })).toBeInTheDocument();
    });
});