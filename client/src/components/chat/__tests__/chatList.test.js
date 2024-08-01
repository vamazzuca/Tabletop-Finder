import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ChatList from '../chatList';
import { getChats } from '../../actions/chats';

jest.mock('../../actions/chats', () => ({
  getChats: jest.fn(),
}));

jest.mock('./chatListItem', () => ({ chat }) => <div>{chat.chatName}</div>);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ChatList Component', () => {
  let store;
  const mockUser = { result: { id: 'user1', name: 'User One' } };
  const mockChats = {
    chats: [
      { _id: 'chat1', chatName: 'Chat One' },
      { _id: 'chat2', chatName: 'Chat Two' },
    ],
  };

  beforeEach(() => {
    store = mockStore({
      chat: mockChats,
    });
  });

  const renderComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <ChatList user={mockUser} chatid="chat1" isChat={false} {...props} />
      </Provider>
    );
  };

  test('should render chat items when chats are available', () => {
    renderComponent();

    expect(screen.getByText(/Chat One/)).toBeInTheDocument();
    expect(screen.getByText(/Chat Two/)).toBeInTheDocument();
  });

  test('should display empty state message when no chats are available', () => {
    store = mockStore({
      chat: { chats: [] },
    });

    renderComponent();

    expect(screen.getByText(/Chat Inbox/)).toBeInTheDocument();
    expect(screen.getByText(/Join an event to start a chat./)).toBeInTheDocument();
  });

  test('should dispatch getChats action with correct user ID on mount', () => {
    renderComponent();

    expect(getChats).toHaveBeenCalledWith({ senderId: mockUser.result.id });
  });

  test('should apply correct classes based on isChat prop', () => {
    const { rerender } = renderComponent({ isChat: false });

    expect(screen.getByRole('list')).toHaveClass('col-span-3 xl:col-span-1');

    rerender(
      <Provider store={store}>
        <ChatList user={mockUser} chatid="chat1" isChat={true} />
      </Provider>
    );

    expect(screen.getByRole('list')).toHaveClass('hidden xl:block xl:col-span-1');
  });
});