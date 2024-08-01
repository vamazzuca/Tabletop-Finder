import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Messages from '../messages';

jest.mock('../components/header', () => () => <div>Header Component</div>);
jest.mock('../components/chat/chatList', () => () => <div>ChatList Component</div>);


beforeAll(() => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify({ name: 'Test User' }));
});

test('renders Header and ChatList components', async () => {
  render(<Messages />);

 
  expect(screen.getByText(/Header Component/i)).toBeInTheDocument();


  expect(screen.getByText(/ChatList Component/i)).toBeInTheDocument();

 
  expect(screen.getByText(/Select a chat to start messaging/i)).toBeInTheDocument();
});

test('updates user state from localStorage', async () => {
  render(<Messages />);

  await waitFor(() => {
   
    expect(screen.getByText(/Header Component/i)).toBeInTheDocument();
  
  });
});