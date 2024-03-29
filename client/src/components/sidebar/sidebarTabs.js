import { Link } from "react-router-dom";

function SidebarTabs({label, onClick, href, icon: Icon}) {
    return (
        
        <div onClick={onClick} className="flex flex-row items-center">
            <Link to={href}>
                <div className="
                    relative
                    rounded-full
                    h-16
                    w-16
                    flex
                    items-center
                    justify-center
                    p-4
                    hover:bg-slate-300
                    hover:bg-opacity-10
                    cursor-pointer
                    lg:hidden
                ">
                    <Icon size={28} color="white"/>
                </div>

                <div className="
                    relative
                    hidden
                    lg:flex
                    gap-4
                    p-4
                    rounded-full
                    hover:bg-slate-300
                    hover:bg-opacity-10
                    cursor-pointer
                    items-center
                ">
                    <Icon size={24} color="white" />
                    <p className="hidden lg:block text-white text-xl">
                        {label}
                    </p>

                    </div>
            </Link>
        </div>
    )
}

export default SidebarTabs