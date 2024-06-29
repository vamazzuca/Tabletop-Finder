import React, { createContext, useContext, useEffect, useState } from "react";


const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  
  const [location, setLocation] = useState(localStorage.getItem("location-tabletop"));
  
    useEffect(() => {
      
      const locationInfo = localStorage.getItem("location-tabletop");
       setLocation(locationInfo);
    
  }, [location]);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const LocationState = () => {
  return useContext(LocationContext);
};

export default LocationContext;