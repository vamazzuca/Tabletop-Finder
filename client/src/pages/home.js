import Header from "../components/header";
import Footer from "../components/footer/footer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
import Post from "../components/post";

function Home() {
    const dispatch = useDispatch();
    

    const posts = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(getPosts())
        
    }, [dispatch])

    return (
        <div className="h-screen col-span-3 flex grid grid-cols-3">
            <div className="h-full xl:px-30 col-span-3 xl:col-span-2"> 
                
                    <div className="flex h-full flex-col items-center">
                        <Header label="Home"/>
                        <hr className="h-px w-11/12 border-0 dark:bg-neutral-800"></hr>
                    
                        <div className="pt-4 w-full h-full overflow-y-scroll flex flex-col items-center">
                            {posts.map((post, index) => <Post key={index} post={post} />)}
                        </div>
                    </div>

                    
                
            </div>
            <Footer/>
        </div>
      
    );
  }
  
  export default Home;