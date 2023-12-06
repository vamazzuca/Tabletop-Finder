import { IoLocationSharp } from "react-icons/io5";



function Profile() {
    return (
        <div className="
            bg-[#1f2833]
            w-[300px]
            h-[320px]
            flex
            flex-col
            p-6
            overflow-hidden
            gap-3
            items-center
            rounded-lg">

            <img className="w-20 h-20 rounded-full bg-white" src="/images/Default_pfp.svg.png" alt="Rounded avatar" />

            <div className="
                gap-2
                flex
                flex-col
                w-full
                text-center
                overflow-hidden">
                
                <h1 className="text-lg font-semibold text-white truncate">{"Alex Mazzuca"}</h1>
                <h2 className="text-gray-400 truncate">{"Alvrrick"}</h2>
                <div className="flex items-center justify-center gap-2">
                    <IoLocationSharp size={20} color="gray" />
                    <p className="text-gray-400">{"Location"}</p>
                </div>
                <p className="text-gray-400 line-clamp-3">{" when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."}</p>
        
            </div>
            
        </div>
    )
}

export default Profile;