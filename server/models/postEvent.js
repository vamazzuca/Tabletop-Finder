import { Int32 } from 'mongodb';
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    descrption: String,
    creator: String,
    photo: String,
    location: String,
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