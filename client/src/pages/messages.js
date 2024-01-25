
import Header from "../components/header";

function Messages() {
    return (
        <div className="h-screen col-span-3 overflow-y-scroll flex grid grid-cols-3">
            <div className="h-full xl:px-30 col-span-3 xl:col-span-3"> 
                
                <div className="flex h-full flex-col items-center">
                    <div className="w-11/12 sticky z-10 top-0 bg-[#0B0C10]">
                        <Header label="Messages" showBackArrow={true}/>
                        <hr className="h-px w-full border-0 dark:bg-neutral-800"></hr>
                    </div>

                    <div className="flex py-4 h-full w-11/12 grid grid-cols-3">
                        <div className="h-full bg-white overflow-scroll col-span-3 xl:col-span-1">

                        </div>
                    </div>

                
                </div>
            </div>
        </div>
    )
}


export default Messages;