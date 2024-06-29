
import Header from "../components/header";
import ChatList from "../components/chat/chatList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Messages() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isuser = JSON.parse(localStorage.getItem('profile-tabletop'))
        
        setUser(isuser)
            
    }, [setUser, navigate])

    return (
        <div className="h-screen overflow-auto pb-16 sm:pb-0 col-span-4 sm:col-span-3 grid grid-cols-3">
            <div className="h-full relative xl:px-30 col-span-3 xl:col-span-3"> 
                
                <div className="h-full absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center">
                    <div className="w-11/12 flex-1 sticky z-10 top-0 bg-[#0B0C10]">
                        <Header label="Messages" showBackArrow={true}/>
                        <hr className="h-px w-full border-0 dark:bg-neutral-800"></hr>
                    </div>

                    <div className="h-full flex py-4 gap-4 min-h-0 w-11/12 grid grid-cols-3">
                        
                        
                        <ChatList user={user} isChat={false}/>
                        
                        
                        <div className="h-full bg-[#0B0C10] border-2 border-neutral-800 hidden xl:flex xl:col-span-2 rounded-lg">
                            <div className="w-full pb-64 flex items-center justify-center text-4xl text-white">
                                Select a chat to start messaging 
                            </div>
                              
                        </div>
                      
                    
                    </div>

                
                </div>
            </div>
        </div>
    )
}


export default Messages;