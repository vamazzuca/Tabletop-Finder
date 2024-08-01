import mongoose from "mongoose";
import { allMessages } from "../controllers/messageController";
import Message from "../models/message";
import { mockRequest, mockResponse } from "jest-mock-express";

jest.mock("../models/message");

describe("allMessages", () => {
  it("should return messages for a chat", async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.params.chatId = mongoose.Types.ObjectId().toString();

    const mockMessages = [
      { content: "Hello", sender: { name: "John" }, chat: req.params.chatId },
      { content: "Hi", sender: { name: "Doe" }, chat: req.params.chatId },
    ];

    Message.find.mockResolvedValue(mockMessages);

    await allMessages(req, res);

    expect(Message.find).toHaveBeenCalledWith({ chat: req.params.chatId });
    expect(res.json).toHaveBeenCalledWith(mockMessages);
  });

  it("should handle errors gracefully", async () => {
    const req = mockRequest();
    const res = mockResponse();

    Message.find.mockRejectedValue(new Error("Error fetching messages"));

    await allMessages(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Error fetching messages" });
  });
});