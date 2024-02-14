import { useContext } from "react";
import LocationContext from "../Context/locationProvider";


const useLocation = () => {
    return useContext(LocationContext);
}

export default useLocation;