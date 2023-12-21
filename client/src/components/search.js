import { AsyncPaginate } from "react-select-async-paginate"
import { IoMdSearch } from "react-icons/io";

function Search({ placeholder, value, disabled, onChange, loadOptions}) {
    
    
   
    const customStyles = {
        control: (provided) => ({
            ...provided,
            background: 'black',
            border: 0,
            boxShadow: 'none',
            paddingTop: '0.75rem ',
            paddingBottom: '0.75rem ',
            fontSize: '1.125rem',
            
          
        }),
        container: base => ({
            ...base,
            flex: 1,
            maxWidth:"91%"
          }),
        option: (provided) => ({
            ...provided,
            fontSize: '16px',
            color: 'black',
        }),
        input: (provided) => ({
            ...provided,
            color: 'white',
            fontSize: '1.125rem',
        
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'white',
        })
        ,
        singleValue: (provided) => ({
            ...provided,
            color: 'white',
        }),
        menu: styles => ({
            ...styles, 
            right: "0px",
           
        }),
    }

    return (
        <div id="search" className=" 
            border-2
            border-neutral-800
            flex
            bg-black
            rounded-md
            focus-within:border-[#66FCF1]
            focus-within:border-2
            transition">
            <div className="pl-2 items-center flex ">
                <IoMdSearch size="24" color="white"/>
            </div>
            
            
            <AsyncPaginate
                isClearable
                cacheOptions
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                required     
                debounceTimeout={500}  
                value={value}
                cacheUniqs={[value]}
                styles={customStyles}
                loadOptions={loadOptions}
                theme={(theme) => ({
                    ...theme,
                    fontSize: '1px',
                    colors: {
                      ...theme.colors,
                        primary: 'white',
                    },
                })} />
        </div>
    )
}


export default Search;

