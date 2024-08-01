import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Footer from '../footer';

describe('Footer component', () => {
    test('renders Footer without crashing', () => {
        render(<Footer />);
     
        const footerElement = screen.getByRole('contentinfo'); 
        expect(footerElement).toBeInTheDocument();
    });


});