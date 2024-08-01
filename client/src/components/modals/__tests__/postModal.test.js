import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostModal from './PostModal';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../reducers'; 
import * as api from '../../api';
import { createPost } from '../../actions/posts';
import { createGroupChat } from '../../actions/chats';

jest.mock('../../api', () => ({
  searchBoardGame: jest.fn(),
  locationSearch: jest.fn(),
}));

jest.mock('../../actions/posts', () => ({
  createPost: jest.fn(),
}));

jest.mock('../../actions/chats', () => ({
  createGroupChat: jest.fn(),
}));

const renderComponent = (initialState) => {
  const store = configureStore({ reducer: rootReducer, preloadedState: initialState });

  return render(
    <Provider store={store}>
      <PostModal />
    </Provider>
  );
};

describe('PostModal Component', () => {
  beforeEach(() => {
    localStorage.setItem('profile-tabletop', JSON.stringify({ result: { id: 'user1' } }));
    localStorage.setItem('profile', JSON.stringify({ result: { id: 'user1' } }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the modal', () => {
    renderComponent({});
    expect(screen.getByText('Create Event')).toBeInTheDocument();
  });

  test('submits the form successfully', async () => {
    const boardGameDataMock = {
      item: {
        name: { value: 'Test Game' },
        yearpublished: { value: '2024' },
        thumbnail: 'thumbnail.jpg',
        description: 'Game description',
        minplayers: { value: 1 },
        maxplayers: { value: 4 },
        minplaytime: { value: 30 },
        maxplaytime: { value: 60 },
        image: 'image.jpg',
      },
    };

    const locationDataMock = [{ key: 'location1', name: 'Test City', country: 'Test Country' }];

    api.searchBoardGame.mockResolvedValue({ data: { result: { item: [boardGameDataMock.item] } } });
    api.locationSearch.mockResolvedValue({ data: { result: locationDataMock } });

    renderComponent({});
    
    userEvent.type(screen.getByPlaceholderText('Search Board Game...'), 'Test Game');
    expect(await screen.findByText('Test Game (2024)')).toBeInTheDocument();


    userEvent.click(await screen.findByText('Test Game (2024)'));

    userEvent.type(screen.getByPlaceholderText('Party Size'), '2');
    userEvent.type(screen.getByPlaceholderText('Search City...'), 'Test City');
    expect(await screen.findByText('Test City, Test Country')).toBeInTheDocument();
    userEvent.click(await screen.findByText('Test City, Test Country'));

   
    userEvent.click(await screen.findByText('Post'));

   
    expect(await screen.findByText('Post')).toBeInTheDocument(); 
    expect(createPost).toHaveBeenCalled();
    expect(createGroupChat).toHaveBeenCalled();
  });

  test('displays error message when party size is out of bounds', async () => {
    const boardGameDataMock = {
      item: {
        name: { value: 'Test Game' },
        yearpublished: { value: '2024' },
        thumbnail: 'thumbnail.jpg',
        description: 'Game description',
        minplayers: { value: 1 },
        maxplayers: { value: 4 },
        minplaytime: { value: 30 },
        maxplaytime: { value: 60 },
        image: 'image.jpg',
      },
    };

    api.searchBoardGame.mockResolvedValue({ data: { result: { item: [boardGameDataMock.item] } } });
    api.locationSearch.mockResolvedValue({ data: { result: [{ key: 'location1', name: 'Test City', country: 'Test Country' }] } });

    renderComponent({});

    userEvent.type(screen.getByPlaceholderText('Search Board Game...'), 'Test Game');
    expect(await screen.findByText('Test Game (2024)')).toBeInTheDocument();

    userEvent.click(await screen.findByText('Test Game (2024)'));

    userEvent.type(screen.getByPlaceholderText('Party Size'), '10');
    userEvent.type(screen.getByPlaceholderText('Search City...'), 'Test City');
    expect(await screen.findByText('Test City, Test Country')).toBeInTheDocument();
    userEvent.click(await screen.findByText('Test City, Test Country'));

    userEvent.click(await screen.findByText('Post'));

   
    expect(await screen.findByText('Party Size out of bounds')).toBeInTheDocument();
  });
});