
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getChats } from "../../actions/chats";
import ChatListItem from "./chatListItem";

function ChatList({user}) {
    
    const dispatch = useDispatch();
    

    const chats = useSelector((state) => state.chat)

    useEffect(() => {
        dispatch(getChats({ senderId: user.result.id }))
        
    }, [dispatch, user] )

    return (
        <div className="h-full rounded-lg overflow-auto bg-[#1f2833] col-span-3 xl:col-span-1">
            <div className="flex overflow-auto rounded-lg divide-y divide-gray-400 px-4 flex-col">
                {chats.chats.map((chat, index) => <ChatListItem key={index } chat={chat} />)}
                
            </div>
            
        </div>
    )
}


export default ChatList