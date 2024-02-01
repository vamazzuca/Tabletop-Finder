import Chat from '../models/chat.js';
import User from '../models/user.js';

export const accessChat = async (req, res) => {
    const { senderId, userId } = req.body
    
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    try {
        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: senderId } } },
                { users: { $elemMatch: { $eq: userId } } }
                
            ]
        })
            .populate("users", "-password")
            .populate("latestMessage")
        
        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: "name photo username email",
        });

        if (isChat.length > 0) {
            res.send(isChat[0]);

        } else {
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [senderId, userId]
            }

            try {
                const createdChat = await Chat.create(chatData)

                const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password")
                
                res.status(200).send(FullChat)
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
    
}


export const fetchChats = async (req, res) => {
    const { senderId } = req.body

    
    try {
        Chat.find({ users: { $elemMatch: { $eq: senderId } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({updatedAt: -1})
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name photo username email"
                });
                res.status(200).send(results)
            }
           
        );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const fetchChat = async (req, res) => {
    const { chatId } = req.body
    try {
        Chat.find({ _id: { $elemMatch: { $eq: chatId } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestessage")
            .sort({updatedAt: -1})
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name photo username email"
                });
                res.status(200).send(results)
            }
           
        );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createGroupChat = async (req, res) => {
    const { senderId, groupName, date, eventId, year } = req.body
    var users = [];
  
     
    try {

    
    users.push(senderId);

    const groupChat = await Chat.create({
        chatName: groupName,
        event: eventId,
        date: date,
        year: year,
        users: users,
        isGroupChat: true,
        groupAdmin: senderId,
    });
  
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
  
      res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
  
export const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;
  
    try {
        const removed = await Chat.findByIdAndUpdate(
            chatId,
            {
              $pull: { users: userId },
            },
            {
              new: true,
            }
          )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        
          if (!removed) {
              res.status(404).json({ message: "Chat Not Found" });
          } else {
            res.json(removed);
          } 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  
    
};
  
export const addToGroup = async (req, res) => {
    const { chatId, userId } = req.body;
  
    try {
        const added = await Chat.findByIdAndUpdate(
            chatId,
            {
              $push: { users: userId },
            },
            {
              new: true,
            }
          )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        
          if (!added) {
              res.status(404).json({ message: "Chat Not Found" });
          } else {
            res.json(added);
          } 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  
    
  };