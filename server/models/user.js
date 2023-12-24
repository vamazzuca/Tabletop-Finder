import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    location: { type: String },
    bio: { type: String },
    photo: {type: String},
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: {type: String}
})

export default mongoose.model("User", userSchema);