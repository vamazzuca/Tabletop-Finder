import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SidebarTitle from '../components/SidebarTitle'; 

describe('SidebarTitle Component', () => {
    test('renders SidebarTitle with icon and text', () => {
        render(
            <Router>
                <SidebarTitle href="/" />
            </Router>
        );

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByText('Tabletop Finder')).toBeInTheDocument();
    });

    test('applies correct styles', () => {
        render(
            <Router>
                <SidebarTitle href="/" />
            </Router>
        );

        const container = screen.getByRole('link');
        expect(container).toHaveClass('hover:bg-blue-300');
        expect(container).toHaveClass('hover:bg-opacity-10');
    });

    test('navigates to the correct href', () => {
        render(
            <Router>
                <SidebarTitle href="/test" />
            </Router>
        );

        expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
    });
});