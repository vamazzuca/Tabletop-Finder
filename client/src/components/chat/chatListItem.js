
import { Markup } from 'interweave'
import dateFormat from 'dateformat'
import { Link } from "react-router-dom";

function ChatListItem({chat, chatid}) {
    

 
    return (
        <Link className={chatid === chat._id ?
            "p-4 flex gap-2 flex-col bg-blue-100 bg-opacity-10 cursor-pointer hover:bg-blue-300 hover:bg-opacity-10" : 
                "p-4 flex gap-2  flex-col cursor-pointer hover:bg-blue-300 hover:bg-opacity-10"} to={`/messages/${chat._id}`}>
            <div className='flex gap-2 items-center'>

            <img className={chat?.groupAdmin.photo ? "w-8 h-8  rounded-full object-cover" : "w-8 h-8  rounded-full bg-white object-cover"}
                                            src={chat?.groupAdmin.photo ? chat?.groupAdmin.photo : "/images/Default_pfp.svg.png"} alt="" />
               
                <h1 className='text-white text-sm md:text-base font-bold'>{chat.groupAdmin.name}</h1>
                        
                <p className="text-gray-400">&#8226;</p>
                <div className='flex gap-1 text-sm text-gray-400 md:text-base'>
                            
                    <p>{chat.groupAdmin.username}</p>
                </div>
                    
            </div>

            <div>
                <div className=" w-full text-white text-base font-bold  items-center flex gap-2">
                    <Markup className="line-clamp-1" content={chat.chatName } />
                    <h2>({chat.year})</h2>
                    <h2 className='line-clamp-1'>Group Chat</h2>
                </div>
                <p className='text-base text-gray-400'>{dateFormat(chat.date, "mmm dS, yyyy, h:MM TT")}</p>
            </div>

            {chat.lastMessage ? <p className='text-white line-clamp-1'>Last Message: {chat.lastMessage} </p> : null}
            
            
            
        </Link>
    )
}


export default ChatListItem