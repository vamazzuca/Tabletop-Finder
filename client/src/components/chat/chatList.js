
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getChats } from "../../actions/chats";
import ChatListItem from "./chatListItem";

function ChatList({user, chatid, isChat}) {
    
    const dispatch = useDispatch();
    
    const chats = useSelector((state) => state.chat)

    useEffect(() => {
        if (user) {
            dispatch(getChats({ senderId: user.result.id }))
        }
        
        
    }, [dispatch, user] )

    return (
        <div className={isChat ? "h-full rounded-lg overflow-auto bg-[#1f2833] hidden xl:block xl:col-span-1" :
            "h-full rounded-lg overflow-auto bg-[#1f2833] col-span-3 xl:col-span-1"}>
            
            <div className="flex divide-y divide-gray-500 flex-col">
                {chats.chats.map((chat, index) => <ChatListItem key={index} chat={chat} chatid={chatid} />)}
                
            </div>
            
        </div>
    )
}


export default ChatList