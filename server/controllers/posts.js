import PostEvent from "../models/postEvent.js";

export const getPosts = async (req, res) => {
    const { location } = req.body;
    
    try {

        if (location) {
            const postEvents = await PostEvent.find({ location: { $eq: location } }, {"date" : { $gte : new Date() }} )
                .populate("members", "-password")
                .populate("creator", "-password")
                .sort({date: 1})
            res.status(200).json(postEvents);
        } else {
            const postEvents = await PostEvent.find({"date" : { $gte : new Date() }})
                .populate("members", "-password")
                .populate("creator", "-password")
                .sort({date: 1})
            res.status(200).json(postEvents);
        }

        
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