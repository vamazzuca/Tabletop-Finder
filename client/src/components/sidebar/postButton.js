import {PiPencilLineBold} from "react-icons/pi"

function PostButton({onClick}) {
    return (
        <div onClick={onClick}>
            <div className="
            mt-6
            lg:hidden
            rounded-full
            h-16
            w-16
            p-4
            flex
            items-center
            justify-center
            bg-[#66FCF1]
            hover:bg-opacity-80
            transition
            cursor-pointer">
                <PiPencilLineBold size={24} color="black"/>
            </div>

            <div className="
            mt-6
            hidden
            lg:block
            px-4
            py-2
            rounded-full
            bg-[#66FCF1]
            hover:bg-opacity-80
            cursor-pointer
            transition">

                <p className="
                hidden
                lg:block
                text-center
                font-bold
                text-black
                text-[20px]">
                    Create Event
                </p>

            </div>
        </div>
        
    )
}


export default PostButton;