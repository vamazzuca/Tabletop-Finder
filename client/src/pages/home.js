import Header from "../components/header";
import Footer from "../components/footer/footer";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
import Post from "../components/post";

function Home() {
    const dispatch = useDispatch();
    const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const posts = useSelector((state) => state.posts)

    useEffect(() => {
        dispatch(getPosts())
        setLoginUser(JSON.parse(localStorage.getItem('profile')))
        
    }, [dispatch])

    return (
        <div className="h-screen col-span-3 overflow-y-scroll flex grid grid-cols-3">
            <div className="h-full xl:px-30 col-span-3 xl:col-span-2"> 
                
                <div className="flex h-full flex-col items-center">
                        <div className="w-11/12 sticky z-10 top-0 bg-[#0B0C10]">
                            <Header label="Home"/>
                            <hr className="h-px w-full border-0 dark:bg-neutral-800"></hr>
                        </div>
                        
                    
                        <div className="pt-4 w-full h-full flex gap-5 flex-col items-center">
                        {posts.posts.map((post, index) => <Post key={index} post={post} loginUser={loginUser } />)}
                        </div>
                    </div>

                    
                
            </div>
            <Footer/>
        </div>
      
    );
  }
  
  export default Home;