function Input({placeholder, value, type, maxLength, disabled, onChange, onFocus, required, defaultValue}) {

    return (
        <div>
            <input
                disabled={disabled}
                onChange={onChange}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onFocus={onFocus}
                maxLength={maxLength}
                required={required}
                type={type}
                className="
                    w-full
                    p-4
                    text-lg
                    placeholder-white
                    w-full
                    bg-black
                    border-2
                    border-neutral-800
                    rounded-md
                    outline-none
                    text-white
                    focus:border-[#66FCF1]
                    focus:border-2
                    transition
                    disabled:bg-neutral-900
                    disabled:opacity-70
                    disabled:cursor-not-allowed"/>
        </div>
    )
}


export default Input;