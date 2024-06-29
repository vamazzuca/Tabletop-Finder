import Header from "../components/header";

function Notifications() {

    return (
        <div className="h-screen col-span-4 sm:col-span-3 pb-20 sm:pb-2 overflow-y-scroll flex grid grid-cols-3">
            <div className="h-full xl:px-30 col-span-3 xl:col-span-2"> 
                
                <div className="flex h-full flex-col items-center">
                        <div className="w-11/12 sticky z-10 top-0 bg-[#0B0C10]">
                            <Header label="Notifications" showBackArrow={true}/>
                            <hr className="h-px w-full border-0 dark:bg-neutral-800"></hr>
                        </div>
                        
                    
                   
                </div>

                    
                
            </div>
            
        </div>
    )
}


export default Notifications;