
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
        <div className={isChat ? "h-full rounded-lg overflow-auto bg-[#0B0C10] border-2 border-neutral-800 hidden xl:block xl:col-span-1" :
            "h-full rounded-lg overflow-auto bg-[#0B0C10] border-2  border-neutral-800 col-span-3 xl:col-span-1"}>
            
            <div className="flex divide-y-2 divide-neutral-800  flex-col">
                {chats.chats.length > 0 ?
                    chats.chats.map((chat, index) => <ChatListItem key={index} chat={chat} chatid={chatid} />) :
                    <div className="text-white font-bold text-2xl gap-4 flex-col items-center justify-center pt-20 flex w-full ">
                        <p>Chat Inbox</p>
                        <p className="text-base font-normal">Your event group chats will appear here.</p>
                    </div>}
                
            </div>
            
        </div>
    )
}


export default ChatList