import Header from "../components/header";
import Footer from "../components/footer/footer";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
import Post from "../components/post";
import useLocation from "../hooks/useLocation";

function Home() {
    const dispatch = useDispatch();
    const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [pageNumber, setPageNumber] = useState(1)

    const observer = useRef()
    const lastEventElement = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [])

    const posts = useSelector((state) => state.posts)

    const { location } = useLocation();


    useEffect(() => {
        dispatch(getPosts({location: location, page: pageNumber}))
        setLoginUser(JSON.parse(localStorage.getItem('profile')))
    }, [dispatch, location, pageNumber])

    return (
        <div className="h-screen col-span-3 overflow-y-scroll flex grid grid-cols-3">
            <div className="h-full xl:px-30 col-span-3 xl:col-span-2"> 
                
                <div className="flex h-full flex-col items-center">
                        <div className="w-11/12 sticky z-10 top-0 bg-[#0B0C10]">
                            <Header label="Home" showLocation={true}/>
                            <hr className="h-px w-full border-0 dark:bg-neutral-800"></hr>
                        </div>
                        
                    
                    <div className="pt-4 w-full h-full flex gap-5 flex-col items-center">
                        
                        {posts.posts.map((post, index) => {
                            if (posts.posts.length === index + 1) {
                                return <Post innerRef={lastEventElement} key={index} post={post} loginUser={loginUser} />
                            } else {
                                return <Post key={index} post={post} loginUser={loginUser} />
                            }
                        }
                            )}
                    </div>
                </div>

                    
                
            </div>
            <Footer/>
        </div>
      
    );
  }
  export default Home;