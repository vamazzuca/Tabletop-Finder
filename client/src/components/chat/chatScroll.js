import ScrollableFeed from "react-scrollable-feed";
import { isSameSenderMargin, isSameUser } from "./chatLogic";
import { useEffect, useState } from "react";

function ChatScroll({ messages}) {
    const [user, setUser] = useState(localStorage.getItem('profile'));

    useEffect(() => {
        const isuser = JSON.parse(localStorage.getItem('profile'))
        
        setUser(isuser)
        
    }, [setUser])

    return (
        <ScrollableFeed>
            {messages.messages && messages.messages.map((message, i)=> (
                <div className="flex" key={message._id}>
                    <span
                        style={{
                            backgroundColor: `${
                            message.sender._id === user.result.id ? "#BEE3F8" : "#B9F5D0"
                        }`,
                            marginLeft: isSameSenderMargin(messages.messages, message, i, user.result.id),
                            marginTop: isSameUser(messages.messages, message, i, user.result.id) ? 3 : 10,
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "100%",
                        }}>
                            {message.content}
                    </span>
                </div>
            ))}
        </ScrollableFeed>
    )
}



export default ChatScroll