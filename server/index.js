import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import boardGamesRoutes from "./routes/boardGames.js"
import locationRoutes from "./routes/location.js"
import chatRoutes from "./routes/chats.js"
import messageRoutes from "./routes/messages.js"

const app = express();
dotenv.config()


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/boardgames', boardGamesRoutes);
app.use('/location', locationRoutes);
app.use('/chat', chatRoutes);
app.use("/api/message", messageRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
