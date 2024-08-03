import { accessChat, fetchChats, fetchChat, createGroupChat, addToGroup, removeFromGroup } from '../chats'; 
import Chat from '../models/chat';
import User from '../models/user';

jest.mock('../models/chat');
jest.mock('../models/user');

const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Chat Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('accessChat', () => {
    it('should return an existing chat if it exists', async () => {
      const req = mockRequest({ senderId: 'user1', userId: 'user2' });
      const res = mockResponse();
      const mockChat = [{ _id: 'chat1', users: ['user1', 'user2'], isGroupChat: false }];
      
      Chat.find.mockResolvedValue(mockChat);
      User.populate.mockResolvedValue(mockChat);

      await accessChat(req, res);

      expect(Chat.find).toHaveBeenCalledWith({
        isGroupChat: false,
        $and: [
          { users: { $elemMatch: { $eq: 'user1' } } },
          { users: { $elemMatch: { $eq: 'user2' } } }
        ]
      });
      expect(res.send).toHaveBeenCalledWith(mockChat[0]);
    });

    it('should create a new chat if it does not exist', async () => {
      const req = mockRequest({ senderId: 'user1', userId: 'user2' });
      const res = mockResponse();
      const mockChat = { _id: 'chat1', users: ['user1', 'user2'], isGroupChat: false };

      Chat.find.mockResolvedValue([]);
      Chat.create.mockResolvedValue(mockChat);
      Chat.findOne.mockResolvedValue(mockChat);

      await accessChat(req, res);

      expect(Chat.create).toHaveBeenCalledWith({
        chatName: 'sender',
        isGroupChat: false,
        users: ['user1', 'user2']
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockChat);
    });
  });

  describe('fetchChats', () => {
    it('should return chats for a user', async () => {
      const req = mockRequest({ senderId: 'user1' });
      const res = mockResponse();
      const mockChats = [{ _id: 'chat1', users: ['user1'], latestMessage: {} }];

      Chat.find.mockResolvedValue(mockChats);
      User.populate.mockResolvedValue(mockChats);

      await fetchChats(req, res);

      expect(Chat.find).toHaveBeenCalledWith({ users: { $elemMatch: { $eq: 'user1' } } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockChats);
    });
  });

  describe('fetchChat', () => {
    it('should return a specific chat by id', async () => {
      const req = mockRequest({ chatId: 'chat1', senderId: 'user1' });
      const res = mockResponse();
      const mockChat = { _id: 'chat1', users: ['user1'], isGroupChat: false };

      Chat.find.mockResolvedValue(mockChat);

      await fetchChat(req, res);

      expect(Chat.find).toHaveBeenCalledWith({ _id: { $eq: 'chat1' }, users: { $elemMatch: { $eq: 'user1' } } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockChat);
    });
  });

  describe('createGroupChat', () => {
    it('should create a group chat', async () => {
      const req = mockRequest({
        senderId: 'user1',
        groupName: 'Group Chat',
        date: '2023-01-01',
        chatEventID: 'event1',
        year: 2023
      });
      const res = mockResponse();
      const mockGroupChat = {
        _id: 'groupChat1',
        users: ['user1'],
        isGroupChat: true,
        groupAdmin: 'user1'
      };

      Chat.create.mockResolvedValue(mockGroupChat);
      Chat.findOne.mockResolvedValue(mockGroupChat);

      await createGroupChat(req, res);

      expect(Chat.create).toHaveBeenCalledWith({
        chatName: 'Group Chat',
        chatEventID: 'event1',
        date: '2023-01-01',
        year: 2023,
        users: ['user1'],
        isGroupChat: true,
        groupAdmin: 'user1'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockGroupChat);
    });
  });

  describe('addToGroup', () => {
    it('should add a user to a group chat', async () => {
      const req = mockRequest({ chatEventId: 'event1', userId: 'user2' });
      const res = mockResponse();
      const mockChat = { _id: 'chat1', users: ['user1', 'user2'], isGroupChat: true };

      Chat.find.mockResolvedValue([mockChat]);
      Chat.findByIdAndUpdate.mockResolvedValue(mockChat);

      await addToGroup(req, res);

      expect(Chat.find).toHaveBeenCalledWith({ chatEventID: 'event1' });
      expect(Chat.findByIdAndUpdate).toHaveBeenCalledWith(
        'chat1',
        { $push: { users: 'user2' } },
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith(mockChat);
    });
  });

  describe('removeFromGroup', () => {
    it('should remove a user from a group chat', async () => {
      const req = mockRequest({ chatEventId: 'event1', userId: 'user2' });
      const res = mockResponse();
      const mockChat = { _id: 'chat1', users: ['user1'], isGroupChat: true };

      Chat.find.mockResolvedValue([mockChat]);
      Chat.findByIdAndUpdate.mockResolvedValue(mockChat);

      await removeFromGroup(req, res);

      expect(Chat.find).toHaveBeenCalledWith({ chatEventID: 'event1' });
      expect(Chat.findByIdAndUpdate).toHaveBeenCalledWith(
        'chat1',
        { $pull: { users: 'user2' } },
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith(mockChat);
    });
  });
});