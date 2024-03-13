import { BsHouseFill} from "react-icons/bs"
import { IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa"
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

function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const tabs = [
    {
        label: "Messages",
        href: "/messages",
        icon: IoMdMail
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
   
    console.log(window.location.pathname.split("/")[1]);
    

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
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-10 bg-[#0B0C10] w-full py-2">
                <div className="relative">
                    <div className="flex realtive justify-evenly">
                        <SidebarTabs
                                href={"/"}
                                
                                icon={BsHouseFill}
                            />
                        <SidebarTabs
                                href={"/search"}
                                
                                icon={IoSearch}
                                />
                        {tabs.map((tab) => (
                            <SidebarTabs
                                key={tab.href}
                                href={user ? tab.href : "/"}
                                
                                icon={tab.icon}
                                onClick={user ? null : onClickLogin}/>
                        ))}
                        {user ? <SidebarTabs onClick={Logout} icon={BiLogOut} /> : <SidebarTabs onClick={onClickLogin} icon={BiLogIn}  />}
                        
                </div>
                {window.location.pathname.split("/")[1] === 'messages' ? null :
                    <div className="absolute bottom-20 right-3">
                    <PostButton onClick={onClickPost} />
                </div>}
                
            </div>
        </div>
    )
}


export default Navbar;