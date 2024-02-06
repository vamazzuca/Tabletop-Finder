
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getChats } from "../../actions/chats";
import ChatListItem from "./chatListItem";

function ChatList({user, chatid}) {
    
    const dispatch = useDispatch();
    
    const chats = useSelector((state) => state.chat)

    useEffect(() => {
        if (user) {
            dispatch(getChats({ senderId: user.result.id }))
        }
        
        
    }, [dispatch, user] )

    return (
        <div className="h-full rounded-lg overflow-auto bg-[#1f2833] ">
            <div className="flex overflow-scroll divide-y divide-gray-500 flex-col">
                {chats.chats.map((chat, index) => <ChatListItem key={index} chat={chat} chatid={chatid } />)}
                <div className="h-[30rem]"></div>
                <div className="h-[30rem]"></div>
                <div className="h-[30rem]"></div>
            </div>
            
        </div>
    )
}


export default ChatList