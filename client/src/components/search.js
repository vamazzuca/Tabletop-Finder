import {AsyncPaginate} from "react-select-async-paginate"

function Search({ placeholder, value, disabled, onChange, loadOptions}) {
    
    
   
    const customStyles = {
        control: (provided) => ({
            ...provided,
            background: 'black',
            border: '2px solid rgb(38 38 38) !important',
            padding: '0.75rem',
            fontSize: '1.125rem',
          
        }),
        option: (provided) => ({
            ...provided,
            fontSize: '16px',
            color: 'black'
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
        })
    }

    return (
        <div>
            <AsyncPaginate
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                required
                value={value}
                styles={customStyles}
                loadOptions={loadOptions}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 4,
                    fontSize: '1px',
                    colors: {
                      ...theme.colors,
                        primary: '#66FCF1',
                    },})}/>
        </div>
    )
}


export default Search;


/* <div className="relative">
            <Input
                onFocus={() => setOpen(true)}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                disabled={disabled} />
            
            <div className={classNames("absolute top-20 border-2 bg-black border-neutral-800 w-full rounded-md transition-all overflow-auto",
            open ? "max-h-40 border-2" : "max-h-0 border-0")}>
                Options
            </div>
    </div> */