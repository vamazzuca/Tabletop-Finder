// Event.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import postReducer from '../../reducers/posts'; 
import Event from '../components/Event';
import { joinEvent, joinChat, leaveEvent, leaveChat } from '../actions/posts';
import { toast } from 'react-toastify';

// Mocking necessary modules and components
jest.mock('../actions/posts', () => ({
  getPost: jest.fn(),
  joinEvent: jest.fn(),
  joinChat: jest.fn(),
  deletePost: jest.fn(),
  leaveEvent: jest.fn(),
  leaveChat: jest.fn()
}));
jest.mock('../hooks/useLoginModel', () => () => ({
  onOpen: jest.fn()
}));
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}));


const store = createStore(combineReducers({ posts: postReducer }));

describe('Event Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Event component with header and footer', () => {
    render(
      <Provider store={store}>
        <Router>
          <Event />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Event/i)).toBeInTheDocument();
    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });

  test('shows loading spinner when isLoading is true', () => {
  
    store.getState = () => ({
      posts: { isLoading: true, post: {}, error: null }
    });

    render(
      <Provider store={store}>
        <Router>
          <Event />
        </Router>
      </Provider>
    );

    expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();
  });

  test('displays event details and allows joining/leave actions', () => {
    store.getState = () => ({
      posts: {
        isLoading: false,
        post: {
          _id: '1',
          creator: { _id: 'user1', name: 'John Doe', username: 'johndoe', photo: '/images/user1.png' },
          title: 'Test Event',
          year: 2024,
          photo: '/images/event.png',
          description: { minPlayers: 2, maxPlayers: 4, minPlaytime: 30, maxPlaytime: 60, description: 'Test Description' },
          location: 'Test Location',
          date: new Date().toISOString(),
          members: [{ _id: 'user2', name: 'Jane Doe', username: 'janedoe', photo: '/images/user2.png' }],
          size: 10,
          chatEventID: 'chat1'
        },
        error: null
      }
    });

    render(
      <Provider store={store}>
        <Router>
          <Event />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Test Event/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Join/i)).toBeInTheDocument();
    expect(screen.getByText(/Description:/i)).toBeInTheDocument();

   
    localStorage.setItem('profile-tabletop', JSON.stringify({ result: { id: 'user2' } }));

    
    fireEvent.click(screen.getByText(/Join/i));
    expect(joinEvent).toHaveBeenCalled();
    expect(joinChat).toHaveBeenCalled();
    
  
    fireEvent.click(screen.getByText(/Leave/i));
    expect(leaveEvent).toHaveBeenCalled();
    expect(leaveChat).toHaveBeenCalled();
  });

  test('shows error toast when error occurs', () => {
 
    store.getState = () => ({
      posts: { isLoading: false, post: {}, error: 'Test Error' }
    });

    render(
      <Provider store={store}>
        <Router>
          <Event />
        </Router>
      </Provider>
    );

    expect(toast.error).toHaveBeenCalledWith('Test Error', expect.any(Object));
  });
});