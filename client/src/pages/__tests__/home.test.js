// Home.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import rootReducer from '../reducers'; 
import Home from '../components/Home';
import { getPosts, getPostsLocation } from '../actions/posts';


// Mock necessary modules and components
jest.mock('../actions/posts', () => ({
  getPosts: jest.fn(),
  getPostsLocation: jest.fn(),
}));

jest.mock('../hooks/useLocation', () => () => ({ location: 'Test Location' }));

// Mock Redux store
const store = createStore(rootReducer);

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Home component with header and footer', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });

  test('displays loading spinner when isLoading is true', () => {
    // Mock state
    store.getState = () => ({
      posts: { posts: [], isLoading: true }
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();
  });

  test('displays no posts message when there are no posts and not loading', () => {
    store.getState = () => ({
      posts: { posts: [], isLoading: false }
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(/No events at this location.../i)).toBeInTheDocument();
  });

  test('displays posts and handles infinite scrolling', () => {
    store.getState = () => ({
      posts: {
        posts: [
          { _id: '1', title: 'Post 1' },
          { _id: '2', title: 'Post 2' },
        ],
        isLoading: false
      }
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(/Post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Post 2/i)).toBeInTheDocument();
    
    
    const lastPost = screen.getByText(/Post 2/i);
    fireEvent.scroll(window, { target: { scrollY: lastPost.offsetTop } });
    expect(getPosts).toHaveBeenCalled();
  });

  test('dispatches getPostsLocation action when location changes', () => {
    store.getState = () => ({
      posts: { posts: [], isLoading: false }
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getPostsLocation).toHaveBeenCalledWith({ location: 'Test Location', page: 1 });
  });
});