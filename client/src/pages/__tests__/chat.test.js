
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Chat from '../components/Chat';


jest.mock('../components/header', () => () => <div>Header</div>);
jest.mock('../components/chat/chatbox', () => () => <div>ChatBox</div>);
jest.mock('../components/chat/chatList', () => () => <div>ChatList</div>);

describe('Chat Component', () => {
  test('renders Chat component with header and chat elements', () => {

    render(
      <Router>
        <Chat />
      </Router>
    );


    expect(screen.getByText(/Messages/i)).toBeInTheDocument();
    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/ChatList/i)).toBeInTheDocument();
    expect(screen.getByText(/ChatBox/i)).toBeInTheDocument();
  });

  test('initializes user state from localStorage', () => {
    const mockUser = { name: 'John Doe' };
    localStorage.setItem('profile-tabletop', JSON.stringify(mockUser));

    render(
      <Router>
        <Chat />
      </Router>
    );

    
    expect(screen.getByText(/ChatList/i)).toHaveAttribute('user', JSON.stringify(mockUser));
  });

  test('navigates on button click', () => {
     render(
      <Router>
        <Chat />
      </Router>
    );

    
  });
});