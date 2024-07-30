import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile'; // Adjust the path if necessary
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers'; // Adjust the path if necessary
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('../components/header', () => () => <div>Header Component</div>);
jest.mock('../components/post', () => ({ post }) => <div>Post: {post.title}</div>);


test('renders Profile component with correct user and posts', async () => {
  const initialState = {
    user: {
      userData: { result: { username: 'testuser', name: 'Test User', photo: '/images/test.png', location: 'Test City', bio: 'Test bio' } },
      isLoadingUser: false,
      error: null
    },
    posts: {
      postsUser: [{ creator: { username: 'testuser' }, title: 'Test Post' }],
      isLoading: false
    }
  };

  const store = createStore(rootReducer, initialState);

  render(
    <Provider store={store}>
      <Router>
        <Profile />
      </Router>
    </Provider>
  );

  expect(screen.getByText(/Header Component/i)).toBeInTheDocument();


  expect(screen.getByText(/Test User/i)).toBeInTheDocument();
  expect(screen.getByText(/testuser/i)).toBeInTheDocument();
  expect(screen.getByText(/Test City/i)).toBeInTheDocument();
  expect(screen.getByText(/Test bio/i)).toBeInTheDocument();

 
  expect(screen.getByText(/Post: Test Post/i)).toBeInTheDocument();
});

test('calls update modal on button click', async () => {
  const initialState = {
    user: {
      userData: { result: { username: 'testuser' } },
      isLoadingUser: false,
      error: null
    },
    posts: {
      postsUser: [],
      isLoading: false
    }
  };

  const store = createStore(rootReducer, initialState);

  const mockUpdateModal = jest.fn();
  jest.mock('../hooks/useUpdateModel', () => () => ({
    onOpen: mockUpdateModal
  }));

  render(
    <Provider store={store}>
      <Router>
        <Profile />
      </Router>
    </Provider>
  );

 
  fireEvent.click(screen.getByText(/Edit Profile/i));

  await waitFor(() => {
    expect(mockUpdateModal).toHaveBeenCalled();
  });
});

test('redirects to /home on error', async () => {
  const initialState = {
    user: {
      userData: { result: { username: 'testuser' } },
      isLoadingUser: false,
      error: 'Error'
    },
    posts: {
      postsUser: [],
      isLoading: false
    }
  };

  const store = createStore(rootReducer, initialState);

  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
  }));

  render(
    <Provider store={store}>
      <Router>
        <Profile />
      </Router>
    </Provider>
  );

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});