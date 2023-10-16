import { BsHouseFill, BsBellFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import SidebarTitle from "./sidebarTitle";
import SidebarTabs from "./sidebarTabs";
import PostButton from "./postButton";
import {BiLogIn} from 'react-icons/bi'

function Sidebar() {
    const tabs = [{
        label: "Home",
        href: "/",
        icon: BsHouseFill
    },
    {
        label: "Notifications",
        href: "/notifications",
        icon: BsBellFill
    },
    {
        label: "Profile",
        href: "/123",
        icon: FaUser
    }
    ];

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6 py-2">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[260px]">
                    <SidebarTitle />
                    {tabs.map((tab) => (
                        <SidebarTabs
                            key={tab.href}
                            href={tab.href}
                            label={tab.label}
                            icon={ tab.icon} />
                    ))}
                    <SidebarTabs onClick={() => { }} icon={BiLogIn} label={"Login"} />
                    <PostButton/>
                </div>
            </div>
        </div>
    )
}


export default Sidebar;