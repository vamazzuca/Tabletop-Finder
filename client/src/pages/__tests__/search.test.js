import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search'; 
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers'; 
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../components/header', () => (props) => (
  <div>
    <input
      type="text"
      value={props.search}
      onChange={(e) => props.setSearch(e.target.value)}
      onKeyDown={props.handleKeyPress}
    />
    <button onClick={() => props.setFilter('events')}>Events Filter</button>
    <button onClick={() => props.setFilter('users')}>Users Filter</button>
  </div>
));
jest.mock('../components/post', () => ({ post }) => <div>Post: {post.title}</div>);
jest.mock('../components/footer/profile', () => ({ user }) => <div>Profile: {user.username}</div>);


test('renders Search component with search input and filters', async () => {
  const initialState = {
    posts: {
      postsSearch: [{ title: 'Test Post' }],
      isLoadingSearch: false,
      users: [{ username: 'testuser' }],
    },
  };

  const store = createStore(rootReducer, initialState);

  render(
    <Provider store={store}>
      <Router>
        <Search />
      </Router>
    </Provider>
  );

 
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByText(/Events Filter/i)).toBeInTheDocument();
  expect(screen.getByText(/Users Filter/i)).toBeInTheDocument();

 
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test' } });
  fireEvent.keyDown(screen.getByRole('textbox'), { keyCode: 13 });

  
  expect(screen.getByText(/Post: Test Post/i)).toBeInTheDocument();
  expect(screen.getByText(/Profile: testuser/i)).toBeInTheDocument();
});

test('handles search input and filter changes', async () => {
  const initialState = {
    posts: {
      postsSearch: [],
      isLoadingSearch: false,
      users: [],
    },
  };

  const store = createStore(rootReducer, initialState);

  render(
    <Provider store={store}>
      <Router>
        <Search />
      </Router>
    </Provider>
  );

 
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'New Search' } });
  fireEvent.click(screen.getByText(/Events Filter/i));

 
  fireEvent.keyDown(screen.getByRole('textbox'), { keyCode: 13 });

  await waitFor(() => {
   
    expect(screen.getByText(/Post: Test Post/i)).toBeInTheDocument();
  });
});

test('displays loading spinner and messages correctly', async () => {
  const initialState = {
    posts: {
      postsSearch: [],
      isLoadingSearch: true,
      users: [],
    },
  };

  const store = createStore(rootReducer, initialState);

  render(
    <Provider store={store}>
      <Router>
        <Search />
      </Router>
    </Provider>
  );


  expect(screen.getByRole('status')).toBeInTheDocument();

  const updatedState = {
    posts: {
      postsSearch: [],
      isLoadingSearch: false,
      users: [],
    },
  };
  store.dispatch({ type: 'UPDATE_STATE', payload: updatedState });

  await waitFor(() => {
    expect(screen.getByText(/Search for tabletop events in your area.../i)).toBeInTheDocument();
  });
});