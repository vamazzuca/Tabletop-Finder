import { IoDiceOutline } from "react-icons/io5"

function sidebarTitle() {
    
    return (
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
        
    )

}

export default sidebarTitle;