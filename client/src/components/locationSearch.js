import { AsyncPaginate } from "react-select-async-paginate"
import { components } from "react-select";

function LocationSearch({ placeholder, value, disabled, onChange, loadOptions, defaultValue}) {
    
    const Input = props => <components.Input {...props} maxLength={30} />
   
    const customStyles = {
        control: (provided) => ({
            ...provided,
            background: '#0B0C10',
            border: 0,
            boxShadow: 'none',
            paddingTop: '0.5rem ',
            paddingBottom: '0.5rem ',
            fontSize: '1.125rem',
            
          
        }),
        container: base => ({
            ...base,
            flex: 1,
            maxWidth:"100%"
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
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        })
        ,
        singleValue: (provided) => ({
            ...provided,
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }),
        menu: styles => ({
            ...styles, 
            right: "0px",
           
        }),
    }

    return (
        <div id="search" className=" 
            
            border-[#66FCF1]
            border-b-2
            
            transition">
            
            <AsyncPaginate
                isClearable
                cacheOptions
                components={{ Input }}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                debounceTimeout={700}  
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


export default LocationSearch;