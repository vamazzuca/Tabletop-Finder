import Sidebar from "../components/sidebar";


function Home() {
    

    return (
        <div className="h-screen">
            <div className="h-full xl:px-30 w-full"> 
                <div className="grid grid-cols-4 h-full">
                    <Sidebar/> 
                    <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                        <h1 className="text-3xl text-[#66FCF1] font-bold">
                            Hello world!
                        </h1>
                    </div>
                </div>
            </div>
        </div>
      
    );
  }
  
  export default Home;