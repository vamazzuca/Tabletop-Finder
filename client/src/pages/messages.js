
import Header from "../components/header";
import ChatBox from "../components/chat/chatbox";
import ChatList from "../components/chat/chatList";
import { useState, useEffect } from "react";

function Messages() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
        
    }, [setUser])

    return (
        <div className="h-screen overflow-auto col-span-3 grid grid-cols-3">
            <div className="h-full relative xl:px-30 col-span-3 xl:col-span-3"> 
                
                <div className="h-full absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center">
                    <div className="w-11/12 flex-1 sticky z-10 top-0 bg-[#0B0C10]">
                        <Header label="Messages" showBackArrow={true}/>
                        <hr className="h-px w-full border-0 dark:bg-neutral-800"></hr>
                    </div>

                    <div className="h-full flex py-4 gap-4 min-h-0 w-11/12 grid grid-cols-3">
                        
                        <ChatList user={user} />
                        <ChatBox/>
                    
                    </div>

                
                </div>
            </div>
        </div>
    )
}


export default Messages;