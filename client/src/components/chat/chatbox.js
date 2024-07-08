import { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getChat } from "../../actions/chats";
import { fetchMessages, sendMessage, addMessage } from "../../actions/message";
import { isSameSenderMargin, isSameUser, isLastMessage, isSameSender } from "./chatLogic";
import io from "socket.io-client"
import { UserState } from "../../Context/UserProvider";
import { useNavigate } from "react-router";
import { Markup } from 'interweave'
import { leaveEvent } from "../../actions/posts";
import { leaveChat } from "../../actions/chats";

const ENDPOINT = "https://tableserver.vittoriomazzuca.ca";
var socket, selectedChatCompare;

function ChatBox({chatid}) {
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [message, setMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('profile-tabletop')));
   

    const { user } = UserState();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { chat, error} = useSelector((state) => state.chat);
    const messages = useSelector((state) => state.message);
    const messagesEndRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            submit();
           
       }
    }
    
    useEffect(() => {
        setLoginUser(JSON.parse(localStorage.getItem('profile-tabletop')))
       
    }, [])


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
        if (error) {
          navigate('/'); 
        }
    }, [error, navigate]);

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


    const leaveHandler = () => {
    
        dispatch(leaveEvent({ userId: loginUser.result.id, chatEventId: chat[0].chatEventID }))
        dispatch(leaveChat({ chatEventId: chat[0].chatEventID, userId: loginUser.result.id }))
        navigate("/messages")
    }
    
    
   
    return (
        <div className="h-full bg-[#0B0C10] border-2  border-neutral-800  flex flex-col p-4 overflow-auto gap-2 xl:col-span-2 col-span-3 rounded-lg">
                <div className="flex justify-between">
                <div className="text-white  p-1 text-lg font-bold line-clamp-1">{chat ? <Markup content={chat[0]?.chatName} /> : null} ({chat ? chat[0]?.year : null}) Group Chat</div>
                {chat[0]?.groupAdmin._id !== loginUser?.result?.id ?
                    <div className="relative">
                        <button onClick={() => setIsOpen((prev) => !prev)} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100  focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-[#0B0C10] dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                                                
                        </button>
                        {isOpen && (
                            <div onClick={leaveHandler} className="bg-[#FF0000] hover:bg-opacity-80 text-black font-semibold cursor-pointer absolute rounded-lg text-lg p-2 top-10 right-[1px]">
                                <h1>Leave</h1>
                            </div>
                        )}
                    </div>
                : <></>}
                </div>
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