import { BsHouseFill, BsBellFill } from "react-icons/bs"
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa"
import { FaUserGroup } from "react-icons/fa6";
import SidebarTitle from "./sidebarTitle";
import SidebarTabs from "./sidebarTabs";
import { IoSearch } from "react-icons/io5";
import PostButton from "./postButton";
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import {useDispatch} from 'react-redux'
import useLoginModal from "../../hooks/useLoginModel";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


import usePostModal from "../../hooks/usePostModel";

function Sidebar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const tabs = [
    {
        label: "Notifications",
        href: "/notifications",
        icon: BsBellFill
    },
    {
        label: "Messages",
        href: "/messages",
        icon: IoMdMail
        },
    {
        label: "Groups",
        href: "/groups",
        icon: FaUserGroup
    },
    {
        label: "Profile",
        href: `/profile/${user?.result?.username}`,
        icon: FaUser
    }
    ];

    const loginModal = useLoginModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const postModal = usePostModal();
   

    

    const onClickLogin = useCallback(() => {
        loginModal.onOpen();
    }, [loginModal])

    const onClickPost = useCallback(() => {
        if (user) {
            postModal.onOpen();
        } else {
            loginModal.onOpen();
        }
        
    }, [postModal, loginModal, user])

    const Logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
       
        setUser(null)
        navigate("/")
        navigate(0)
    }, [dispatch, navigate])

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwtDecode(token)

            if (decodedToken.exp < new Date() / 1000) { 
               
                //Logout();
            } 
        }
       
        setUser(JSON.parse(localStorage.getItem('profile')))
        
        
        
    }, [location, Logout, user?.token]);

    return (
        <div className="col-span-1 h-full pr-4 md:pr-6 py-2">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[260px]">
                    <SidebarTitle href={"/"} />
                    <SidebarTabs
                            href={"/"}
                            label={"Home"}
                            icon={BsHouseFill}
                        />
                    <SidebarTabs
                            href={"/search"}
                            label={"Search"}
                            icon={IoSearch}
                            />
                    {tabs.map((tab) => (
                        <SidebarTabs
                            key={tab.href}
                            href={user ? tab.href : "/"}
                            label={tab.label}
                            icon={tab.icon}
                            onClick={user ? null : onClickLogin}/>
                    ))}
                    {user ? <SidebarTabs onClick={Logout} icon={BiLogOut} label={"Logout"} /> : <SidebarTabs onClick={onClickLogin} icon={BiLogIn} label={"Login"} />}
                    <PostButton onClick={onClickPost} />
                </div>
            </div>
        </div>
    )
}


export default Sidebar;