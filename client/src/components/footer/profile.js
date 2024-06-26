import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";



function Profile({user, innerRef}) {

    return (
        <Link ref={innerRef } className="
            border-2
            border-neutral-800
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
            <img className={user?.photo ? "w-20 h-20 rounded-full object-cover" : "w-20 h-20 rounded-full bg-white object-cover"}
                                src={user?.photo ? user?.photo : "/images/Default_pfp.svg.png"} alt="" />
           
            
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
                    <p className="text-gray-400">{user?.location ? user?.location : " No Location"}</p>
                </div>
                <p className="pt-3 text-gray-400 line-clamp-3">{user?.bio ? user?.bio : "This user currently has no biography..."}</p>
        
            </div>
            
        </Link>
    )
}

export default Profile;