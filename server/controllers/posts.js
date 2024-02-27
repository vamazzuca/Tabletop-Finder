import PostEvent from "../models/postEvent.js";
import User from "../models/user.js";

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

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, location} = req.query;

    try {
        const LIMIT = 5;
        //const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostEvent.countDocuments({})

        const regex = new RegExp(searchQuery, 'i');
        const users = await User.find({ $or: [{ username: regex }, { name: regex }] });
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
        const added = await PostEvent.findByIdAndUpdate(
            eventId,
            {
              $push: { members: userId },
            },
            {
              new: true,
            }
        )
            .populate("members", "-password")
            .populate("creator", "-password");
        
          if (!added) {
              res.status(404).json({ message: "Event Not Found" });
          } else {
            res.json(added);
          } 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  
    
  };