function Input({placeholder, value, type, disabled, onChange, onFocus}) {

    return (
        <div>
            <input
                disabled={disabled}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                onFocus={onFocus}
                required
                type={type}
                className="
                    w-full
                    p-4
                    text-lg
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