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
import { Server } from "socket.io";
import path from "path";


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
app.use("/message", messageRoutes);


const _dirname = path.dirname("")
const buildPath = path.join(_dirname, "../client/build")
app.use(express.static(buildPath))

app.get("*/", function (req, res) {
    res.sendFile(
        path.join(__firname, "../client/build/index.html"),
        function (err) {
            if (err)
                res.status(500).send(err)
        }
    )
})


const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log("connected to socket.io")

    socket.on('setup', (userData) => {
        socket.join(userData.id);
        socket.emit("connected");
    })

    socket.on('join chat', (room) => {
        socket.join(room)
        console.log("user Joined Room: " + room)
    })

    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user => {
            
           
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved)

        })
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData.id)
    });

});

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => server)
    .catch((error) => console.log(error.message));
