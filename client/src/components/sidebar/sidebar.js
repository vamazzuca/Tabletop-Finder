import { BsHouseFill, BsBellFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import SidebarTitle from "./sidebarTitle";
import SidebarTabs from "./sidebarTabs";
import PostButton from "./postButton";
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import {useDispatch} from 'react-redux'
import useLoginModal from "../../hooks/useLoginModel";
import { useCallback, useEffect, useState } from "react";
import {useNavigate, useLocation} from 'react-router-dom'

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

    const loginModal = useLoginModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const onClickLogin = useCallback(() => {
        loginModal.onOpen();
    }, [loginModal])

    const onClickLogout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null)
        navigate('/')
    }

    useEffect(() => {

        // JWT
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);

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
                    <SidebarTabs onClick={onClickLogin} icon={BiLogIn} label={"Login"} />
                    <PostButton/>
                </div>
            </div>
        </div>
    )
}


export default Sidebar;