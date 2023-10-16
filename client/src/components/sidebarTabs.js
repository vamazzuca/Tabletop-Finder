

function SidebarTabs({label, href, icon: Icon}) {
    return (
        <div className="flex flex-row items-center">
            <div className="
                relative
                rounded-full
                h-16
                w-16
                flex
                items-center
                justify-center
                p-4
                hover:bg-slate-300
                hover:bg-opacity-10
                cursor-pointer
                lg:hidden
            ">
                <Icon size={28} color="white"/>
            </div>

            <div className="
                relative
                hidden
                lg:flex
                gap-4
                p-4
                rounded-full
                hover:bg-slate-300
                hover:bg-opacity-10
                cursor-pointer
                items-center
            ">
                <Icon size={24} color="white" />
                <p className="hidden lg:block text-white text-xl">
                    {label}
                </p>

            </div>
        </div>
    )
}

export default SidebarTabs