import { useState } from "react";


function ChatBox() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("")

    return (
        <div className="h-full bg-[#1f2833] flex flex-col p-4 col-span-3 gap-2 xl:col-span-2 rounded-lg">
            <div className="h-full w-full rounded-lg bg-[#151C23]"></div>
            <input
                disabled={isLoading}
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
        </div>
    )
}


export default ChatBox