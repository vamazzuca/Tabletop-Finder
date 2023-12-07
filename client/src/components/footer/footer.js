import Profile from "./profile";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

function Footer() {


    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();

    useEffect(() => {
        

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]);


    return (
        <div className="
            flex-col 
            items-start
            py-3
            pl-4
            h-full
            hidden
            xl:flex
            xl:col-span-1">
            {user ? <Profile user={user} />: null}
        </div>
    )
}

export default Footer;