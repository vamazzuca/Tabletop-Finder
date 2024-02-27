import { useContext } from "react";
import LocationContext from "../Context/locationProvider";


const useLocationSelector = () => {
    return useContext(LocationContext);
}

export default useLocationSelector;