import Message from "../models/message.js";
import User from "../models/user.js";
import Chat from "../models/chat.js";


export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name photo email username")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const sendMessage = async (req, res) => {
  const { content, chatId, userId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: userId,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name photo username");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name photo username email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {

    res.status(400).json({ message: error.message });
  }
};