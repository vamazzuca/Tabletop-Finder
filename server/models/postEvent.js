import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    photo: String,
    location: String,
    date: Date,
    applications: [String],
    size: Number,
    members: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }

})

const PostEvent = mongoose.model('PostEvent', postSchema)

export default PostEvent;