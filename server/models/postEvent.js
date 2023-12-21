import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    year: {type: Number, required: true},
    description: { description: String, minPlayers: Number, maxPlayers: Number, minPlaytime: Number, maxPlaytime: Number },
    creator: { type: String, required: true },
    photo: { type: String, required: true },
    thumbnail: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    applications: [String],
    size: { type: Number, required: true },
    members: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }

})

const PostEvent = mongoose.model('PostEvent', postSchema)

export default PostEvent;