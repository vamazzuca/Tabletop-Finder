import { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getChat } from "../../actions/chats";
import { fetchMessages, sendMessage, addMessage } from "../../actions/message";
import { isSameSenderMargin, isSameUser, isLastMessage, isSameSender } from "./chatLogic";
import io from "socket.io-client"
import { UserState } from "../../Context/UserProvider";
import { useNavigate } from "react-router";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

function ChatBox({chatid}) {
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [message, setMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
   

    const { user } = UserState();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { chat} = useSelector((state) => state.chat);
    const messages = useSelector((state) => state.message);
    const messagesEndRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            submit();
           
       }
    }
    
    
    useEffect(() => {
        socket = io(ENDPOINT);
        if (user) {
            
            socket.emit("setup", user.result);
            socket.on("connected", () => setSocketConnected(true))
          
        }

       
    }, [user])

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare !== newMessageRecieved.chat._id) {
                // Notification
            } else {
                dispatch(addMessage(newMessageRecieved))
                
            }
        })
    }, [dispatch, chatid])

    useEffect(() => {
        if (user && chatid.match(/^[0-9a-fA-F]{24}$/)) {
           
            dispatch(getChat({ senderId: user.result.id, chatId: chatid }))
            dispatch(fetchMessages(chatid, socket))
            selectedChatCompare = chatid
           
            
        } else {
            navigate("/")
        }

    }, [dispatch, chatid, user, navigate])


    useEffect(() => {
        
        if (chat === null) {
            navigate("/")
        }
        
    }, [chat, navigate])

    useEffect(() => {
        
        messagesEndRef.current?.scrollIntoView();
    }, [messages])


    const submit = () => {
        if (!socketConnected) return;
        try {
            setIsLoadingSubmit(true) 
            dispatch(sendMessage({ content: message, chatId: chatid, userId: user.result.id }, socket))
            setMessage("")
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingSubmit(false)
        }
            
    }
    
    

    return (
        <div className="h-full bg-[#0B0C10] border-2  border-neutral-800  flex flex-col p-4 overflow-auto gap-2 xl:col-span-2 col-span-3 rounded-lg">
            <div className="text-white  p-1 text-lg font-bold line-clamp-1">{chat? chat[0]?.chatName: null} ({chat? chat[0]?.year: null}) Group Chat</div>

          
                <div className="h-full  w-full p-3 text-black d-flex flex-column overflow-auto align-items-start justify-end rounded-lg bg-[#0B0C10]">
                
                
                {messages.messages && user && messages.messages.map((message, i) => (
            
                        <div className="flex gap-1" key={i}>

                        
                            {(isSameSender(messages.messages, message, i, user.result.id) ||
                                isLastMessage(messages.messages, i, user.result.id)) && (
                            <div className="tooltip tooltip-right " data-tip={message.sender.name}>
                                <img className={message.sender.photo ? "w-8 h-8 mt-[11px] cursor-pointer rounded-full object-cover" : "w-8 h-8 mt-[11px] cursor-pointer rounded-full bg-white object-cover"}
                                            src={message.sender.photo ? message.sender.photo : "/images/Default_pfp.svg.png"} alt="" />
                                    
                                </div>
                                    
                                )}
                            <span
                                style={{
                                    backgroundColor: `${
                                    message.sender._id === user.result.id ? "#79c5f1" : "#B9F5D0"
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
                
                    <div ref={messagesEndRef}/>

                </div>
           
            

            <div className="flex items-center space-x-2 ">
            <input
                    disabled={isLoadingSubmit}
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
                        bg-[#0B0C10]
                        border-2
                        border-neutral-800
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
                        text-[#0B0C10]
                        bg-[#66FCF1]
                        hover:bg-opacity-80
                        transition
                        cursor-pointer"><IoIosSend size={24 } /> </button>    
            </div>
                
            
        </div>
    )
}


export default ChatBox