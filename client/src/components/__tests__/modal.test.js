import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../modal';

describe('Modal Component', () => {
    const renderComponent = (props = {}) => {
        return render(
            <Modal
                isOpen={true}
                onClose={jest.fn()}
                disabled={false}
                title="Modal Title"
                body={<div>Modal Body</div>}
                footer={<div>Modal Footer</div>}
                {...props}
            />
        );
    };

    test('should render Modal component when isOpen is true', () => {
        renderComponent();
        expect(screen.getByText(/Modal Title/)).toBeInTheDocument();
        expect(screen.getByText(/Modal Body/)).toBeInTheDocument();
        expect(screen.getByText(/Modal Footer/)).toBeInTheDocument();
    });

    test('should not render Modal component when isOpen is false', () => {
        renderComponent({ isOpen: false });
        expect(screen.queryByText(/Modal Title/)).not.toBeInTheDocument();
    });

    test('should handle close button click', () => {
        const onClose = jest.fn();
        renderComponent({ onClose });

        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalled();
    });

    test('should not call onClose when disabled', () => {
        const onClose = jest.fn();
        renderComponent({ onClose, disabled: true });

        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(onClose).not.toHaveBeenCalled();
    });

    test('should display the title and body content', () => {
        renderComponent({ title: 'Test Title', body: <div>Test Body</div> });
        expect(screen.getByText(/Test Title/)).toBeInTheDocument();
        expect(screen.getByText(/Test Body/)).toBeInTheDocument();
    });
});