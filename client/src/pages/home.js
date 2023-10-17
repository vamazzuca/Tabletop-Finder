import Header from "../components/header";
import Sidebar from "../components/sidebar/sidebar";


function Home() {
    

    return (
        <div className="h-screen">
            <div className="h-full xl:px-30 w-full"> 
                <div className="grid grid-cols-4 h-full">
                    <Sidebar/> 
                    <div className="col-span-3 lg:col-span-2 flex flex-col items-center">
                        <Header label="Home"/>
                        <hr className="h-px w-11/12 border-0 dark:bg-neutral-800"></hr>
                    </div>
                </div>
            </div>
        </div>
      
    );
  }
  
  export default Home;