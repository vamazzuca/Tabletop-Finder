import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import io from 'socket.io-client';
import ChatBox from '../chatbox';
import {  sendMessage, addMessage } from '../../actions/message';
import { leaveEvent } from '../../actions/posts';
import { leaveChat } from '../../actions/chats';

jest.mock('socket.io-client');
jest.mock('../../actions/chats', () => ({
  getChat: jest.fn(),
  leaveChat: jest.fn(),
}));
jest.mock('../../actions/message', () => ({
  fetchMessages: jest.fn(),
  sendMessage: jest.fn(),
  addMessage: jest.fn(),
}));
jest.mock('../../actions/posts', () => ({
  leaveEvent: jest.fn(),
}));
jest.mock('../../Context/UserProvider', () => ({
  UserState: () => ({
    user: {
      result: { id: 'user1', name: 'User One' },
    },
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ChatBox Component', () => {
  let store;

  const mockChat = [
    {
      _id: 'chat1',
      chatName: 'Sample Chat',
      year: '2024',
      groupAdmin: { _id: 'admin1', name: 'Admin' },
      chatEventID: 'chatEvent1',
    },
  ];

  const mockMessages = {
    messages: [
      {
        _id: 'msg1',
        content: 'Hello',
        sender: { _id: 'user1', name: 'User One', photo: null },
        chat: { _id: 'chat1' },
      },
      {
        _id: 'msg2',
        content: 'Hi there',
        sender: { _id: 'user2', name: 'User Two', photo: null },
        chat: { _id: 'chat1' },
      },
    ],
  };

  beforeEach(() => {
    store = mockStore({
      chat: { chat: mockChat, error: null },
      message: mockMessages,
    });

    io.mockReturnValue({
      emit: jest.fn(),
      on: jest.fn(),
    });

    localStorage.setItem('profile-tabletop', JSON.stringify({ result: { id: 'user1' } }));
  });

  const renderComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <Router>
          <ChatBox chatid="chat1" {...props} />
        </Router>
      </Provider>
    );
  };

  test('should render ChatBox component with correct data', () => {
    renderComponent();

    expect(screen.getByText(/Sample Chat/)).toBeInTheDocument();
    expect(screen.getByText(/2024 Group Chat/)).toBeInTheDocument();
    expect(screen.getByText(/Hello!/)).toBeInTheDocument();
    expect(screen.getByText(/Hi there!/)).toBeInTheDocument();
  });

  test('should send a message when Send button is clicked', () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/Start a new message/);
    fireEvent.change(input, { target: { value: 'New message' } });

    const sendButton = screen.getByRole('button', { name: /Send/i });
    fireEvent.click(sendButton);

    expect(sendMessage).toHaveBeenCalledWith(
      { content: 'New message', chatId: 'chat1', userId: 'user1' },
      expect.any(Object)
    );
  });

  test('should establish a socket connection', () => {
    renderComponent();

    expect(io).toHaveBeenCalledWith('https://tableserver.vittoriomazzuca.ca');
  });

  test('should handle new messages from socket', () => {
    const mockSocket = {
      emit: jest.fn(),
      on: jest.fn((event, callback) => {
        if (event === 'message recieved') {
          callback({
            _id: 'msg3',
            content: 'New message from socket',
            sender: { _id: 'user3', name: 'User Three', photo: null },
            chat: { _id: 'chat1' },
          });
        }
      }),
    };

    io.mockReturnValue(mockSocket);

    renderComponent();

    expect(addMessage).toHaveBeenCalledWith({
      _id: 'msg3',
      content: 'New message from socket',
      sender: { _id: 'user3', name: 'User Three', photo: null },
      chat: { _id: 'chat1' },
    });
  });

  test('should leave chat when Leave button is clicked', () => {
    const nonAdminChat = [
      {
        ...mockChat[0],
        groupAdmin: { _id: 'admin1', name: 'Admin' }, 
      },
    ];

    store = mockStore({
      chat: { chat: nonAdminChat, error: null },
      message: mockMessages,
    });

    renderComponent();

    const leaveButton = screen.getByRole('button', { name: /Leave/i });
    fireEvent.click(leaveButton);

    expect(leaveEvent).toHaveBeenCalledWith({ userId: 'user1', chatEventId: 'chatEvent1' });
    expect(leaveChat).toHaveBeenCalledWith({ chatEventId: 'chatEvent1', userId: 'user1' });
  });

  test('should navigate away when there is an error', () => {
    const errorChatState = { chat: { chat: null, error: 'Error fetching chat' } };

    store = mockStore(errorChatState);

    renderComponent();

    expect(screen.queryByText(/Sample Chat/)).not.toBeInTheDocument();
  });
});