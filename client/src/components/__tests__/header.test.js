import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../header';
import * as api from '../api';
import useLocationSelector from '../hooks/useLocation';

jest.mock('../hooks/useLocation', () => ({
    __esModule: true,
    default: jest.fn(),
    useLocationSelector: () => ({
        setLocation: jest.fn(),
        location: 'Test Location',
    }),
}));

jest.mock('../api', () => ({
    locationSearch: jest.fn(),
}));

describe('Header Component', () => {
    const renderComponent = (props = {}) => {
        return render(
            <Router>
                <Header {...props} />
            </Router>
        );
    };

    test('should render Header component', () => {
        renderComponent();
        expect(screen.getByText(/Test Location/)).toBeInTheDocument();
    });

    test('should navigate back when back arrow is clicked', () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);
        renderComponent({ showBackArrow: true });

        const backArrow = screen.getByRole('button', { name: /back/i });
        fireEvent.click(backArrow);

        expect(navigate).toHaveBeenCalledWith(-1);
    });

    test('should handle search input change', () => {
        const setSearch = jest.fn();
        renderComponent({ showSearch: true, search: '', setSearch });

        const searchInput = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(searchInput, { target: { value: 'test search' } });

        expect(setSearch).toHaveBeenCalledWith('test search');
    });

    test('should handle location change', async () => {
        const setLocation = jest.fn();
        const mockLocation = 'New Location';
        useLocationSelector.mockReturnValue({ setLocation, location: mockLocation });
        api.locationSearch.mockResolvedValue({
            data: {
                result: [{ key: '1', name: 'New Location', country: 'Test Country' }],
            },
        });

        renderComponent({ showLocation: true });

        const locationSearchInput = screen.getByPlaceholderText(/Search City/i);
        fireEvent.change(locationSearchInput, { target: { value: 'New' } });

        await waitFor(() => expect(api.locationSearch).toHaveBeenCalled());
        await waitFor(() => expect(setLocation).toHaveBeenCalledWith('New Location, Test Country'));
        expect(localStorage.getItem('location-tabletop')).toBe('New Location, Test Country');
    });

    test('should handle footer filter change', () => {
        const setFilter = jest.fn();
        renderComponent({ showFooter: true, filter: 'events', setFilter });

        const usersFilterButton = screen.getByText(/Users/i);
        fireEvent.click(usersFilterButton);

        expect(setFilter).toHaveBeenCalledWith('users');
    });
});