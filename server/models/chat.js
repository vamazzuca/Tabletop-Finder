import mongoose from 'mongoose';


const chatSchema = mongoose.Schema({
    chatName: { type: String, trim: true },
    year: {type: Number},
    date: {type: Date},
    isGroupChat: { type: Boolean, default: false },
    chatEventID: {type: String},
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }
)


export default mongoose.model("Chat", chatSchema);