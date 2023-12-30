import PostEvent from "../models/postEvent.js";

export const getPosts = async (req, res) => {
    try {
        const postEvents = await PostEvent.find()

        

        res.status(200).json(postEvents);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPost = async (req, res) => {

    const { id } = req.params;

    try {
        const postEvent = await PostEvent.findById(id)
        if (!postEvent) return res.status(404).json({ message: "Can't find Post." })
        

        res.status(200).json(postEvent);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostEvent(post);

    try {
        await newPost.save()

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}