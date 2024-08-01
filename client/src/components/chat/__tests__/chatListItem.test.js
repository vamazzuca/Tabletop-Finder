import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ChatListItem from './chatListItem.test';
import dateFormat from 'dateformat';

const mockChat = {
  _id: 'chat1',
  chatName: 'Chat One',
  groupAdmin: {
    name: 'Admin Name',
    username: 'adminuser',
    photo: '/path/to/photo.png',
  },
  year: 2024,
  date: new Date('2024-07-31T15:00:00'),
  lastMessage: 'Hello, this is the last message',
};

const renderComponent = (chatid) => {
  render(
    <BrowserRouter>
      <ChatListItem chat={mockChat} chatid={chatid} />
    </BrowserRouter>
  );
};

describe('ChatListItem Component', () => {
  test('should render chat information correctly', () => {
    renderComponent('differentChatId');

    expect(screen.getByText(mockChat.groupAdmin.name)).toBeInTheDocument();
    expect(screen.getByText(mockChat.groupAdmin.username)).toBeInTheDocument();
    expect(screen.getByText(/Chat One/)).toBeInTheDocument();
    expect(screen.getByText(`(${mockChat.year})`)).toBeInTheDocument();
    expect(screen.getByText(/Group Chat/)).toBeInTheDocument();
    expect(
      screen.getByText(dateFormat(mockChat.date, 'mmm dS, yyyy, h:MM TT'))
    ).toBeInTheDocument();
  });

  test('should render a link pointing to the correct chat URL', () => {
    renderComponent('differentChatId');

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/messages/${mockChat._id}`);
  });

  test('should apply correct classes based on selected chat', () => {
    const { rerender } = renderComponent('chat1');

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveClass(
      'p-4 flex gap-2 flex-col bg-blue-100 bg-opacity-10 cursor-pointer hover:bg-blue-300 hover:bg-opacity-10'
    );

    rerender(
      <BrowserRouter>
        <ChatListItem chat={mockChat} chatid="differentChatId" />
      </BrowserRouter>
    );

    expect(linkElement).toHaveClass(
      'p-4 flex gap-2 flex-col cursor-pointer hover:bg-blue-300 hover:bg-opacity-10'
    );
  });

  test('should render the last message when available', () => {
    renderComponent('differentChatId');

    expect(
      screen.getByText(`Last Message: ${mockChat.lastMessage}`)
    ).toBeInTheDocument();
  });

  test('should not render last message if not available', () => {
    const chatWithoutLastMessage = { ...mockChat, lastMessage: null };

    render(
      <BrowserRouter>
        <ChatListItem chat={chatWithoutLastMessage} chatid="differentChatId" />
      </BrowserRouter>
    );

    expect(screen.queryByText(/Last Message:/)).not.toBeInTheDocument();
  });
});