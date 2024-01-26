import mongoose from 'mongoose';


const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: { type: String, trim: true },
    chat: {
        tpye: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    
},
    {
        timestamps: true
    }
)


export default mongoose.model("Chat", messageSchema);