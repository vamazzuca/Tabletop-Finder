import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../profile';

const mockUser = {
    username: 'johndoe',
    name: 'John Doe',
    photo: 'http://example.com/photo.jpg',
    location: 'New York',
    bio: 'Software engineer'
};

describe('Profile component', () => {
    test('renders Profile with user data', () => {
        render(
            <Router>
                <Profile user={mockUser} />
            </Router>
        );

      
        const profileImage = screen.getByRole('img');
        const profileName = screen.getByText(/John Doe/i);
        const profileUsername = screen.getByText(/johndoe/i);
        const profileLocation = screen.getByText(/New York/i);
        const profileBio = screen.getByText(/Software engineer/i);

        expect(profileImage).toBeInTheDocument();
        expect(profileName).toBeInTheDocument();
        expect(profileUsername).toBeInTheDocument();
        expect(profileLocation).toBeInTheDocument();
        expect(profileBio).toBeInTheDocument();
    });

    test('renders default photo and bio when user data is missing', () => {
        render(
            <Router>
                <Profile user={{}} />
            </Router>
        );

      
        const profileImage = screen.getByRole('img');
        const profileName = screen.getByText(/No Location/i);
        const profileBio = screen.getByText(/This user currently has no biography.../i);

        expect(profileImage).toHaveAttribute('src', '/images/Default_pfp.svg.png');
        expect(profileName).toBeInTheDocument();
        expect(profileBio).toBeInTheDocument();
    });

    test('renders profile link with correct URL', () => {
        render(
            <Router>
                <Profile user={mockUser} />
            </Router>
        );

        const profileLink = screen.getByRole('link', { name: /johndoe/i });
        expect(profileLink).toHaveAttribute('href', '/profile/johndoe');
    });
});