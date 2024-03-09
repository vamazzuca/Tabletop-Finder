import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";



function Profile({user, innerRef}) {

    
    return (
        <Link ref={innerRef } className="
            bg-[#1f2833]
            sticky 
            top-3
            w-[300px]
            h-[320px]
            flex
            flex-col
            p-6
            overflow-hidden
            gap-3
            items-center
            rounded-lg" to={`/profile/${user.username}`}>

            <img className="w-20 h-20 rounded-full bg-white" src="/images/Default_pfp.svg.png" alt="Rounded avatar" />
            
            <div className="
                gap-1
                flex
                flex-col
                w-full
                text-center
                overflow-hidden">
                
                <h1 className="text-lg font-semibold text-white truncate">{user?.name}</h1>
                <h2 className="text-gray-400 truncate">{user?.username}</h2>
                <div className="flex items-center justify-center gap-2">
                    <IoLocationSharp size={20} color="gray" />
                    <p className="text-gray-400">{" No Location"}</p>
                </div>
                <p className="pt-3 text-gray-400 line-clamp-3">{"This user currently has no biography..."}</p>
        
            </div>
            
        </Link>
    )
}

export default Profile;