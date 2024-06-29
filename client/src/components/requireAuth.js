import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";


export default function RequireAuth() {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('profile-tabletop')));
    const location = useLocation();

    useEffect(() => {
        setAuth(JSON.parse(localStorage.getItem('profile-tabletop')))
    }, [])
    
    console.log(auth)
    return (
        auth?.result?.email ? <Outlet /> : <Navigate to="/" state={{ from: location}} replace/>
    )
}