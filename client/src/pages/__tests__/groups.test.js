
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import postReducer from '../../reducers/posts'; 
import Groups from '../groups';
import { getPostsByMember } from '../actions/posts';


jest.mock('../actions/posts', () => ({
  getPostsByMember: jest.fn()
}));


const store = createStore(combineReducers({ posts: postReducer }));

describe('Groups Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Groups component with header and footer', () => {
    render(
      <Provider store={store}>
        <Router>
          <Groups />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/My Groups/i)).toBeInTheDocument();
    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });

  test('displays loading spinner when isLoading is true', () => {
    store.getState = () => ({
      posts: { postsMember: [], isLoading: true }
    });

    render(
      <Provider store={store}>
        <Router>
          <Groups />
        </Router>
      </Provider>
    );

    expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();
  });

  test('displays posts and handles infinite scrolling', () => {
    store.getState = () => ({
      posts: {
        postsMember: [
          { _id: '1', title: 'Post 1' },
          { _id: '2', title: 'Post 2' },
        ],
        isLoading: false
      }
    });

    render(
      <Provider store={store}>
        <Router>
          <Groups />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Post 2/i)).toBeInTheDocument();
    
    
    const lastPost = screen.getByText(/Post 2/i);
    fireEvent.scroll(window, { target: { scrollY: lastPost.offsetTop } });
    expect(getPostsByMember).toHaveBeenCalled();
  });

  test('handles login user state correctly', () => {
    
    localStorage.setItem('profile-tabletop', JSON.stringify({ result: { id: 'user123' } }));
    store.getState = () => ({
      posts: {
        postsMember: [],
        isLoading: false
      }
    });

    render(
      <Provider store={store}>
        <Router>
          <Groups />
        </Router>
      </Provider>
    );

  
    expect(getPostsByMember).toHaveBeenCalledWith({ userId: 'user123', page: 1 });
  });
});