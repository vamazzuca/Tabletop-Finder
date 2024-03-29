import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    year: {type: Number, required: true},
    description: { description: String, minPlayers: Number, maxPlayers: Number, minPlaytime: Number, maxPlaytime: Number },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    photo: { type: String, required: true },
    chatEventID: {type: String, required: true},
    thumbnail: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    applications: [String],
    size: { type: Number, required: true },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    createdAt: {
        type: Date,
        default: new Date()
    }

},
{
    timestamps: true
})

const PostEvent = mongoose.model('PostEvent', postSchema)

export default PostEvent;