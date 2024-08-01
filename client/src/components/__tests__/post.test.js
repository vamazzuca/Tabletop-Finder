import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom/extend-expect';
import Post from '../post';
import useLoginModal from '../../hooks/useLoginModel';

// Mock dependencies
jest.mock('react-router-dom', () => ({
    Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
}));

jest.mock('../hooks/useLoginModel', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

jest.mock('../actions/posts', () => ({
    joinEvent: jest.fn(),
}));

jest.mock('../actions/chats', () => ({
    joinChat: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Post Component', () => {
    let store;

    const samplePost = {
        _id: '1',
        creator: {
            name: 'John Doe',
            username: 'johndoe',
            photo: null,
        },
        title: 'Sample Event',
        year: '2024',
        photo: 'sample.jpg',
        description: {
            minPlayers: 2,
            maxPlayers: 4,
            minPlaytime: 30,
            maxPlaytime: 60,
        },
        members: [],
        size: 4,
        location: 'Sample Location',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        chatEventID: 'chat1',
    };

    beforeEach(() => {
        store = mockStore({});
        jest.clearAllMocks();
        localStorage.setItem('profile-tabletop', JSON.stringify({ result: { id: 'user1' } }));
        useLoginModal.mockReturnValue({ onOpen: jest.fn() });
    });

    const renderComponent = (props = {}) => {
        return render(
            <Provider store={store}>
                <Post post={samplePost} {...props} />
            </Provider>
        );
    };

    test('should render Post component with correct data', () => {
        renderComponent();

        expect(screen.getByText(/John Doe/)).toBeInTheDocument();
        expect(screen.getByText(/johndoe/)).toBeInTheDocument();
        expect(screen.getByText(/Sample Event/)).toBeInTheDocument();
        expect(screen.getByText(/2-4 Players/)).toBeInTheDocument();
        expect(screen.getByText(/30-60 Min/)).toBeInTheDocument();
        expect(screen.getByText(/0 \/ 4 Members/)).toBeInTheDocument();
        expect(screen.getByText(/Sample Location/)).toBeInTheDocument();
    });

    test('should call join handler when Join button is clicked', () => {
        renderComponent();

        const joinButton = screen.getByRole('button', { name: /Join/i });
        fireEvent.click(joinButton);

        expect(store.getActions()).toEqual([
            expect.objectContaining({ type: 'JOIN_EVENT' }),
            expect.objectContaining({ type: 'JOIN_CHAT' }),
        ]);
    });

    test('should open login modal if not logged in', () => {
        localStorage.removeItem('profile-tabletop');
        renderComponent();

        const joinButton = screen.getByRole('button', { name: /Join/i });
        fireEvent.click(joinButton);

        const loginModal = useLoginModal();
        expect(loginModal.onOpen).toHaveBeenCalled();
    });

    test('should show error notification if event is full', () => {
        const fullPost = { ...samplePost, members: Array(samplePost.size).fill({}) };
        renderComponent({ post: fullPost });

        const joinButton = screen.getByRole('button', { name: /Join/i });
        fireEvent.click(joinButton);

        expect(toast.error).toHaveBeenCalledWith("Event Full", expect.any(Object));
    });
});