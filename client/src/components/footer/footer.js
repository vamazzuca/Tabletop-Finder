import Profile from "./profile";


function Footer() {
    return (
        <div className="
            flex-col 
            items-start
            py-3
            pl-4
            h-full
            hidden
            xl:flex
            xl:col-span-1">
                <Profile/>
        </div>
    )
}

export default Footer;