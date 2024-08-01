import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../input';

describe('Input Component', () => {
    const renderComponent = (props = {}) => {
        return render(
            <Input
                placeholder="Enter text"
                value=""
                type="text"
                maxLength={30}
                disabled={false}
                onChange={jest.fn()}
                onFocus={jest.fn()}
                required={false}
                defaultValue=""
                {...props}
            />
        );
    };

    test('should render Input component', () => {
        renderComponent();
        expect(screen.getByPlaceholderText(/Enter text/)).toBeInTheDocument();
    });

    test('should display the placeholder', () => {
        renderComponent({ placeholder: "Enter text" });
        expect(screen.getByPlaceholderText(/Enter text/)).toBeInTheDocument();
    });

    test('should handle input value change', () => {
        const onChange = jest.fn();
        renderComponent({ onChange });

        const inputElement = screen.getByPlaceholderText(/Enter text/);
        fireEvent.change(inputElement, { target: { value: 'New Value' } });

        expect(onChange).toHaveBeenCalled();
        expect(inputElement.value).toBe('New Value');
    });

    test('should handle disabled state', () => {
        renderComponent({ disabled: true });

        const inputElement = screen.getByPlaceholderText(/Enter text/);
        expect(inputElement).toBeDisabled();
    });

    test('should respect max length', () => {
        renderComponent({ maxLength: 5 });

        const inputElement = screen.getByPlaceholderText(/Enter text/);
        fireEvent.change(inputElement, { target: { value: '123456' } });

        expect(inputElement.value.length).toBe(5);
    });

    test('should handle focus event', () => {
        const onFocus = jest.fn();
        renderComponent({ onFocus });

        const inputElement = screen.getByPlaceholderText(/Enter text/);
        fireEvent.focus(inputElement);

        expect(onFocus).toHaveBeenCalled();
    });

    test('should have required attribute', () => {
        renderComponent({ required: true });

        const inputElement = screen.getByPlaceholderText(/Enter text/);
        expect(inputElement).toBeRequired();
    });

    test('should set default value', () => {
        renderComponent({ defaultValue: 'Default Text' });

        const inputElement = screen.getByPlaceholderText(/Enter text/);
        expect(inputElement.value).toBe('Default Text');
    });
});