import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostButton from '../postButton';

describe('PostButton Component', () => {
    test('renders PostButton component with correct styles', () => {
        render(<PostButton onClick={() => {}} />);
        
        expect(screen.getByRole('button', { name: /Create Event/i })).toBeInTheDocument();
        
        expect(screen.getByText(/Create Event/i)).toBeInTheDocument();
    });

    test('calls onClick handler when button is clicked', () => {
        const mockOnClick = jest.fn();
        render(<PostButton onClick={mockOnClick} />);
        
        fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));
        
        expect(mockOnClick).toHaveBeenCalled();
    });


    test('displays button with correct text on large screens', () => {
        global.innerWidth = 1200;
        global.dispatchEvent(new Event('resize'));

        render(<PostButton onClick={() => {}} />);
        
 
        expect(screen.getByText(/Create Event/i)).toBeInTheDocument();
    });

    test('hides button text on small screens', () => {
    
        global.innerWidth = 600;
        global.dispatchEvent(new Event('resize'));

        render(<PostButton onClick={() => {}} />);
        
       
        expect(screen.queryByText(/Create Event/i)).not.toBeInTheDocument();
    });
});