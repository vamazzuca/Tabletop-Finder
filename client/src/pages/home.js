import Header from "../components/header";



function Home() {
    

    return (
        <div className="h-screen col-span-3 lg:col-span-2">
            <div className="h-full xl:px-30"> 
                
                    <div className="flex flex-col items-center">
                        <Header label="Home"/>
                        <hr className="h-px w-11/12 border-0 dark:bg-neutral-800"></hr>
                    </div>
                
            </div>
        </div>
      
    );
  }
  
  export default Home;