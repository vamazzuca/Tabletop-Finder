import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import LocationSearch from "./locationSearch";
import { IoLocationSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import * as api from '../api';
import useLocation from "../hooks/useLocation";

function Header({ label, showBackArrow, showLocation }) {
    
    const navigate = useNavigate();
    
    
    const { setLocation } = useLocation()
    const {location} = useLocation()

    useEffect(() => {
        setLocation(localStorage.getItem('location'))
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
                            label: `${location.EnglishName}, ${location.AdministrativeArea.EnglishName}`
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
        console.log(value)
        if (value) {
            setLocation(value.label)
            localStorage.setItem('location', value.label)
            
        } else {
            localStorage.removeItem('location')
            setLocation("")
        }
        
    }

    return (
        <div className="p-5 w-full">
            <div className="flex flex-row items-center gap-2">
                
                    {
                        showBackArrow && (
                            <BiArrowBack onClick={() => navigate(-1)} color="white" size={20} className="cursor-pointer hover:opacity-70 transition"/>
                        )
                    }
                
                <div className="flex w-full gap-2 items-center justify-between">
                    <h1 className="text-white text-lg lg:text-xl font-semibold">{label}</h1>

                    {
                        showLocation && (<div className="flex items-center">
                            <IoLocationSharp size={22} />
                            <div className="w-[10rem] lg:w-[16rem]">
                                <LocationSearch placeholder={location ? location : "Search City..."}
                                    onChange={handleLocationChange}
                                    loadOptions={promiseLocationOptions}
                                    value={location}
                                    />
                            </div>
                        </div>)
                    }
                    
                    
                   
                </div>
                
            </div>
        </div>
        
    )
}

export default Header;