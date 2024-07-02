import PostEvent from "../models/postEvent.js";
import User from "../models/user.js";
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    const { location, page } = req.body;
   
    try {
        const LIMIT = 5;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostEvent.countDocuments({})

        if (location) {
            const postEvents = await PostEvent.find({ location: { $eq: location } , "date" : { $gte : new Date() }} )
                .populate("members", "-password")
                .populate("creator", "-password")
                .sort({ date: 1 })
                .limit(LIMIT)
                .skip(startIndex)
            res.status(200).json(postEvents);
        } else {
            const postEvents = await PostEvent.find({"date" : { $gte : new Date() }})
                .populate("members", "-password")
                .populate("creator", "-password")
                .sort({ date: 1 })
                .limit(LIMIT)
                .skip(startIndex)
            res.status(200).json(postEvents);
        }

        
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostEvent.findByIdAndRemove(id);

    res.status(200).json({ message: "Post deleted successfully." });
}


export const getPostsByUser = async (req, res) => {
    const { userId, page } = req.body;
   
    try {
        const LIMIT = 5;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostEvent.countDocuments({})

        
        const postEvents = await PostEvent.find({ creator: { $eq: userId }} )
                .populate("members", "-password")
                .populate("creator", "-password")
                .sort({ createdAt: -1 })
                .limit(LIMIT)
                .skip(startIndex)
        res.status(200).json(postEvents);
        

        
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPostsByMember = async (req, res) => {
    const { userId, page } = req.body;
   
    try {
        const LIMIT = 5;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostEvent.countDocuments({})

        
        const postEvents = await PostEvent.find({ members: { $elemMatch: { $eq: userId } } } )
                .populate("members", "-password")
                .populate("creator", "-password")
                .sort({ createdAt: -1 })
                .limit(LIMIT)
                .skip(startIndex)
        
        res.status(200).json(postEvents);
        

        
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, location, page} = req.query;

    try {
        const LIMIT = 5;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostEvent.countDocuments({})

        const regex = new RegExp(searchQuery, 'i');
        const users = await User.find({ $or: [{ username: regex }, { name: regex }] }).select("-password");
        const userIds = users.map(user => user._id);

        let query = {
            $or: [
                { title: regex }, 
                { creator: { $in: userIds } },
            ]
        };

        if (location && location !== 'null') {
            query = { $and: [{ ...query }, { location }] }; 
        }

       
        const postEvents = await PostEvent.find(query)
            .populate("members", "-password")
            .populate("creator", "-password")
            .sort({ createdAt: -1 })
            .limit(LIMIT)
            .skip(startIndex)
           
        
        
        res.status(200).json({ data: postEvents, users: users });
        
     
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPost = async (req, res) => {

    const { id } = req.params;

    try {
        const postEvent = await PostEvent.findById(id)
            .populate("members", "-password")
            .populate("creator", "-password");
        if (!postEvent) return res.status(404).json({ message: "Can't find Post." })
        

        res.status(200).json(postEvent);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    try {

        const newPost = await PostEvent.create(post);


        const fullPost = await PostEvent.findOne({ _id: newPost._id })
            .populate("members", "-password")
            .populate("creator", "-password");

        res.status(201).json(fullPost);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const joinEvent = async (req, res) => {
    const { eventId, userId } = req.body;
  
    try {
        const event = await PostEvent.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event Not Found" });
        }

        const isMember = event.members.includes(userId);

        if (isMember) {
            return res.status(400).json({ message: "User is already a member of this event" });
        }

      
        event.members.push(userId);
        await event.save();

      
        const updatedEvent = await PostEvent.findById(eventId)
            .populate("members", "-password")
            .populate("creator", "-password");

        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
  
export const leaveEvent = async (req, res) => {
    const { chatEventId, userId } = req.body;
    
    try {

        const event = await PostEvent.find({ chatEventID: chatEventId  })

        const left = await PostEvent.findByIdAndUpdate(
            event[0]._id,
            {
              $pull: { members: userId },
            },
            {
              new: true,
            }
        )
            .populate("members", "-password")
            .populate("creator", "-password");
        
          if (!left) {
              res.status(404).json({ message: "Event Not Found" });
          } else {
            res.json(left);
          } 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  
    
  };