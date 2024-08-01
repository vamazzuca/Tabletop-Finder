// UpdateModal.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpdateModal from '../updateModal';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../..reducers'; 
import axios from 'axios';
import { jest } from '@jest/globals';


jest.mock('axios');
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));


const mockUpdateData = {
  result: {
    id: '123',
    username: 'testuser',
    name: 'Test User',
    location: 'Test Location',
    bio: 'Test Bio',
    photo: 'https://example.com/image.jpg',
    email: 'test@example.com',
  },
};

const store = createStore(rootReducer, {
  user: { updateData: mockUpdateData },
});

describe('UpdateModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the modal and form fields', () => {
    render(
      <Provider store={store}>
        <UpdateModal />
      </Provider>
    );

    expect(screen.getByText(/Update Profile/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Name/i)).toHaveValue('Test User');
    expect(screen.getByPlaceholderText(/Username/i)).toHaveValue('testuser');
    expect(screen.getByPlaceholderText(/Location/i)).toHaveValue('Test Location');
    expect(screen.getByPlaceholderText(/Biography/i)).toHaveValue('Test Bio');
  });

  test('handles file upload and displays image', async () => {
    axios.post.mockResolvedValueOnce({
      data: { url: 'https://example.com/newimage.jpg' },
    });

    render(
      <Provider store={store}>
        <UpdateModal />
      </Provider>
    );

    const file = new File(['dummy content'], 'test-image.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/Upload Image/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByAltText(/Rounded avatar/i)).toHaveAttribute('src', 'https://example.com/newimage.jpg');
    });
  });

  test('submits the form with correct data', async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <UpdateModal />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'Updated Name' } });
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'updateduser' } });
    fireEvent.change(screen.getByPlaceholderText(/Location/i), { target: { value: 'Updated Location' } });
    fireEvent.change(screen.getByPlaceholderText(/Biography/i), { target: { value: 'Updated Bio' } });

    fireEvent.click(screen.getByText(/Update/i));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: expect.any(String),
        payload: expect.objectContaining({
          id: '123',
          username: 'updateduser',
          name: 'Updated Name',
          email: 'test@example.com',
          photo: 'https://example.com/image.jpg',
          bio: 'Updated Bio',
          location: 'Updated Location',
        }),
      }));
    });
  });
});