import Header from "../components/header";
import Footer from "../components/footer/footer";


function Home() {
    

    return (
        <div className="h-screen col-span-3 flex grid grid-cols-3">
            <div className="h-full xl:px-30 col-span-3 xl:col-span-2"> 
                
                    <div className="flex flex-col items-center">
                        <Header label="Home"/>
                        <hr className="h-px w-11/12 border-0 dark:bg-neutral-800"></hr>
                    </div>

                    
                
            </div>
            <Footer/>
        </div>
      
    );
  }
  
  export default Home;