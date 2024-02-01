import { IoDiceOutline } from "react-icons/io5"
import { Link } from "react-router-dom";

function sidebarTitle({href}) {
    
    return (
        <Link to={href}>
                <div className="
                    rounded-full
                    p-4
                    gap-4
                    flex
                    items-center
                    hover:bg-blue-300
                    hover:bg-opacity-10
                    cursor-pointer
                    transition
                    ">
                
                    <IoDiceOutline size={28} color="#66FCF1" />
                    <p className="hidden lg:block text-[#66FCF1] text-xl font-bold">
                        Tabletop Finder
                    </p>
            
                
            </div>
        </Link>
        
        
    )

}

export default sidebarTitle;