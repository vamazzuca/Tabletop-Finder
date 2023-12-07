import Input from "./input";
import { useState, useEffect } from "react";
import classNames from 'classnames';

function Search({ placeholder, value, disabled, onChange, boardGame, setBoardGame }) {
    
    const [open, setOpen] = useState(false);


    useEffect(() => {

    }, [])

    return (
        <div className="relative flex flex-col justify-center">
            <Input
                onFocus={() => setOpen(true)}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                disabled={disabled} />
            
            <div className={classNames("absolute top-16 border-2 bg-black border-neutral-800 w-full rounded-md transition-all overflow-auto",
            open ? "max-h-40 border-2" : "max-h-0 border-0")}>
                Options
            </div>
        </div>
    )
}


export default Search;