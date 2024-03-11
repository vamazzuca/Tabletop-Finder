import Header from "../components/header";
import Footer from "../components/footer/footer";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostsByMember } from "../actions/posts";
import Post from "../components/post";

import MoonLoader from "react-spinners/MoonLoader";

function Groups() {
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1)
    const { postsMember, isLoading } = useSelector((state) => state.posts)
    const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('profile')));

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


    useEffect(() => {
            setLoginUser(JSON.parse(localStorage.getItem('profile')))
            dispatch(getPostsByMember({ userId: loginUser.result.id, page: pageNumber }))
           
    }, [dispatch, pageNumber, loginUser.result.id])


    return (
        <div className="h-screen col-span-4 sm:col-span-3 overflow-y-scroll flex grid grid-cols-3">
            <div className="h-full xl:px-30 col-span-3 xl:col-span-2"> 
                
                <div className="flex h-full flex-col items-center">
                        <div className="w-11/12 sticky z-10 top-0 bg-[#0B0C10]">
                            <Header label="My Groups"/>
                            <hr className="h-px w-full border-0 dark:bg-neutral-800"></hr>
                        </div>
                        
                    
                    <div className="pt-4 w-full h-full flex gap-5 flex-col items-center">
                        
                        {postsMember && postsMember.map((post, index) => {
                            if (postsMember.length === index + 1) {
                                return <Post innerRef={lastEventElement} key={index} post={post}/>
                            } else {
                                return <Post key={index} post={post} />
                            }
                        }
                        )}
                        {isLoading ? <div className="flex items-center"><MoonLoader size={30 } color="#66FCF1"/></div>: null}
                    </div>
                </div>

                    
                
            </div>
            <Footer/>
        </div>
      
    );
}
  


export default Groups;