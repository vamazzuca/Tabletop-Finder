import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '../search';

describe('Search Component', () => {
    const renderComponent = (props = {}) => {
        return render(
            <Search
                placeholder="Search City..."
                value={null}
                disabled={false}
                onChange={jest.fn()}
                loadOptions={jest.fn()}
                {...props}
            />
        );
    };

    test('should render Search component', () => {
        renderComponent();
        expect(screen.getByPlaceholderText(/Search City.../)).toBeInTheDocument();
    });

    test('should display the placeholder', () => {
        renderComponent({ placeholder: "Search City..." });
        expect(screen.getByPlaceholderText(/Search City.../)).toBeInTheDocument();
    });

    test('should handle input change', () => {
        const onChange = jest.fn();
        renderComponent({ onChange });

        const inputElement = screen.getByPlaceholderText(/Search City.../);
        fireEvent.change(inputElement, { target: { value: 'New York' } });

        expect(onChange).toHaveBeenCalled();
    });

    test('should handle disabled state', () => {
        renderComponent({ disabled: true });

        const inputElement = screen.getByPlaceholderText(/Search City.../);
        expect(inputElement).toBeDisabled();
    });

    test('should call loadOptions function', async () => {
        const loadOptions = jest.fn().mockResolvedValue({
            options: [{ value: 'NY', label: 'New York' }],
        });
        renderComponent({ loadOptions });

        const inputElement = screen.getByPlaceholderText(/Search City.../);
        fireEvent.change(inputElement, { target: { value: 'New York' } });

        await waitFor(() => expect(loadOptions).toHaveBeenCalled());
    });
});