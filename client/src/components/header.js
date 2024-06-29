import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import LocationSearch from "./locationSearch";
import { IoLocationSharp } from "react-icons/io5";
import { useEffect } from "react";
import * as api from '../api';
import useLocationSelector from "../hooks/useLocation";
import { IoMdSearch } from "react-icons/io";

function Header({ label, showBackArrow, showLocation, showSearch, search, setSearch, handleKeyPress, setFilter, showFooter, filter }) {
    
    const navigate = useNavigate();
    
    
    const { setLocation } = useLocationSelector()
    const {location} = useLocationSelector()

    useEffect(() => {
        setLocation(localStorage.getItem('location-tabletop'))
    }, [setLocation])

    const loadOptionsLocation = async (inputValue) => {
       
        const formData = { query: inputValue }

        if (!formData.query) {
            return {
                options : []
            }
        }

        try {
            const { data } = await api.locationSearch(formData);


            if (data?.result) {
            
                return {
                    options: data?.result.slice(0, 20).map((location) => {
                        return {
                            value: location.key,
                            label: `${location.name}, ${location.country}`
                        }
                    })
                }
            } else {
                return {
                    options : []
                }
            }
        } catch (error) {
            console.log(error)
        } 
        
            
    }

    const promiseLocationOptions = (inputValue) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(loadOptionsLocation(inputValue));
        }, 1000);
    });

    const handleLocationChange = (value) => {
        
        if (value) {
            setLocation(value.label)
            localStorage.setItem('location-tabletop', value.label)
            
        } else {
            localStorage.removeItem('location-tabletop')
            setLocation("")
        }
        
    }

    return (
        <div className=" flex flex-col gap-2 w-full">
            <div className="px-5 pt-5 pb-3 flex w-full flex-row items-center gap-2">
                
                    {
                        showBackArrow && (
                            <BiArrowBack onClick={() => navigate(-1)} color="white" size={20} className="cursor-pointer hover:opacity-70 transition"/>
                        )
                    }
                
                <div className="flex  flex-col md:flex-row w-full md:gap-4 md:items-center justify-between">
                    
                    {label && <h1 className="text-white text-lg lg:text-xl font-semibold">{label}</h1>}

                    {showSearch && <div id="search" className=" 
                        w-full
                        border-2
                        border-neutral-800
                        flex
                        flex-1
                        bg-[#0B0C10]
                        rounded-md
                        focus-within:border-[#66FCF1]
                        focus-within:border-2
                        transition">
                        <div className="pl-2 items-center flex ">
                            <IoMdSearch size="24" color="white"/>
                        </div>
            
            
                        <input className="
                            outline-none
                            w-full
                            p-2
                            text-lg
                            text-white
                            placeholder-white
                            w-full
                            bg-[#0B0C10]"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyPress}/>
                    </div>}
                    {
                        showLocation && (<div className="flex items-center">
                            <IoLocationSharp size={22} />
                            <div className="w-full md:w-[16rem]">
                                <LocationSearch placeholder={location ? location : "Search City..."}
                                    onChange={handleLocationChange}
                                    loadOptions={promiseLocationOptions}
                                    defaultValue={location}
                                    />
                            </div>
                        </div>)
                    }
                    
                                     
                </div>
               
            </div>

            { showFooter && (<div className="flex w-full divide-x divide-neutral-800">
                <div onClick={() => setFilter('events')} className="w-full flex flex-col items-center hover:bg-blue-300 cursor-pointer hover:bg-opacity-10 text-center">
                    <h1 className="py-4">Events</h1>
                    {filter === 'events' ? <div className='w-1/4 border-[#66FCF1] border-b-2' /> : null}
                </div>
                
                <div onClick={() => setFilter('users')} className="w-full flex flex-col items-center hover:bg-blue-300 cursor-pointer hover:bg-opacity-10 text-center">
                    <h1 className="py-4 ">Users</h1>
                    {filter === 'users' ? <div className='w-1/4 border-[#66FCF1] border-b-2' /> : null}
                </div>
            
            </div>)
            }
        </div>
        
    )
}

export default Header;