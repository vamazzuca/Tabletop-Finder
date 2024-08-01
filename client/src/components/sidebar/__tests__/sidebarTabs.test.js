import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SidebarTabs from '../components/SidebarTabs'; 
import { FaUser } from 'react-icons/fa';


const MockIcon = ({ size, color }) => <FaUser size={size} color={color} />;

describe('SidebarTabs Component', () => {
    test('renders SidebarTabs with icon and label', () => {
        render(
            <Router>
                <SidebarTabs
                    label="Profile"
                    href="/profile"
                    icon={MockIcon}
                />
            </Router>
        );

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    test('applies correct styles for mobile and desktop', () => {
        render(
            <Router>
                <SidebarTabs
                    label="Profile"
                    href="/profile"
                    icon={MockIcon}
                />
            </Router>
        );

  
        expect(screen.getByRole('img')).toHaveClass('lg:hidden');
        expect(screen.queryByText('Profile')).toBeNull();

        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveClass('lg:flex');
    });

    test('handles click events', () => {
        const handleClick = jest.fn();

        render(
            <Router>
                <SidebarTabs
                    label="Profile"
                    href="/profile"
                    icon={MockIcon}
                    onClick={handleClick}
                />
            </Router>
        );

        fireEvent.click(screen.getByRole('link'));

        expect(handleClick).toHaveBeenCalled();
    });

    test('navigates to the correct href', () => {
        render(
            <Router>
                <SidebarTabs
                    label="Profile"
                    href="/profile"
                    icon={MockIcon}
                />
            </Router>
        );

        expect(screen.getByRole('link')).toHaveAttribute('href', '/profile');
    });
});