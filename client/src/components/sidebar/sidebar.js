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
import { Link } from "react-router-dom";


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
        <div className="hidden sm:block sm:col-span-1 h-full pr-4 md:pr-6 py-2">
            <div className="flex flex-col items-end justify-between h-full">
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
                {user ? <Link className="flex lg:w-[260px] gap-6  p-2 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer" to={`/profile/${user?.result?.username}`}>
                    
                    <img className={user?.result?.photo ? "w-14 h-14 rounded-full object-cover" : "w-14 h-14 rounded-full bg-white object-cover"}
                                src={user?.result?.photo ? user?.result?.photo : "/images/Default_pfp.svg.png"} alt="" />
                    <div className="hidden lg:flex flex-col justify-center">
                        <h1 className="font-semibold text-white truncate">{user?.result?.name}</h1>
                        <h2 className="text-gray-400 truncate">{user?.result?.username}</h2>
                    </div>
                </Link>: null}
            </div>
        </div>
    )
}


export default Sidebar;