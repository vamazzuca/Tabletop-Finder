import { useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getChat } from "../../actions/chats";

function ChatBox({user, chatid}) {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("")

    const dispatch = useDispatch();
    
    const chat = useSelector((state) => state.chat)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setMessage("")
           
       }
    }
    

    useEffect(() => {
        if (user) {
            dispatch(getChat({ senderId: user.result.id, chatId: chatid }))
           
        }

        
       
    }, [dispatch, user, chatid])


    const submit = () => {
        setMessage("")
        
       
     }

    return (
        <div className="h-full bg-[#1f2833] flex flex-col p-4 col-span-3 gap-2 xl:col-span-2 rounded-lg">
            <div className="text-white p-1 text-lg font-bold line-clamp-1">{chat?.chat[0]?.chatName} ({chat?.chat[0]?.year}) Group Chat</div>

            <div className="h-full w-full rounded-lg bg-[#151C23]"></div>

            <div className="flex items-center space-x-2 ">
            <input
                    disabled={isLoading}
                    onKeyDown={handleKeyDown}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder={"Start a new message"}
                    maxLength={200}
                    className="
                        w-full
                        p-4
                        text-lg
                        placeholder-white
                        bg-[#151C23]
                        border-2
                        border-gray-700
                        rounded-md
                        outline-none
                        text-white
                        focus:border-[#66FCF1]
                        focus:border-2
                        transition
                        disabled:bg-neutral-900
                        disabled:opacity-70
                        disabled:cursor-not-allowed"/>
           
                    <button onClick={submit} className="            
                        rounded-full
                        h-14
                        w-14
                        shrink-0
                        p-4
                        flex
                        items-center
                        justify-center
                        bg-[#66FCF1]
                        hover:bg-opacity-80
                        transition
                        cursor-pointer"><IoIosSend size={24 } /> </button>    
            </div>
                
            
        </div>
    )
}


export default ChatBox