import Header from "../components/header"
import { IoLocationSharp } from "react-icons/io5";
import { useParams } from "react-router";
import { getUser } from "../actions/user";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback, useState, useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import useUpdateModal from "../hooks/useUpdateModel";
import { getPostsByUser, reset } from "../actions/posts";
import Post from "../components/post";
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';

export default function Profile() {


    const dispatch = useDispatch();

    const { userData, isLoadingUser, error } = useSelector((state) => state.user)
    const { postsUser, isLoading } = useSelector((state) => state.posts)
    const [pageNumber, setPageNumber] = useState(1)
    const { username } = useParams();
    const navigate = useNavigate();
  
    const location = useLocation();

    const updateModal = useUpdateModal()


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


    const onClickUpdate = useCallback(() => {
        updateModal.onOpen();
        
    }, [updateModal])

    useEffect(() => {
        if (error) {
          navigate('/home'); 
        }
    }, [error, navigate]);

    useEffect(() => {
        dispatch(getUser({ username: username }))
    }, [dispatch, username])

    useEffect(() => {
        dispatch(getPostsByUser({ userId: userData?.result?.id, page: pageNumber }))
    }, [dispatch, userData, pageNumber, location])


    useEffect(() => {
        setPageNumber(1)
    }, [location])

    return (
        <div className="h-screen col-span-4 pb-20 sm:pb-2 sm:col-span-3 overflow-y-scroll flex grid grid-cols-3">
                <div className="h-full xl:px-30 col-span-3 xl:col-span-2"> 
                
                <div className="flex h-full flex-col items-center">
                    <div className="w-11/12 sticky z-10 top-0 bg-[#0B0C10]">
                        <Header label="Profile" showBackArrow={true}/>
                        <hr className="h-px w-full border-0 dark:bg-neutral-800"></hr>
                    </div>
                    
                    <div className="pt-4 w-full h-full flex gap-2 flex-col items-center">
                        <div className="flex w-11/12 justify-end">
                            <button onClick={onClickUpdate} className="
                                    z-1
                                    bg-[#66FCF1]                               
                                    hover:bg-opacity-80
                                    active:bg-opacity-90
                                    text-[#1f2833]
                                    font-bold
                                    text-sm
                                    md:text-base
                                    py-1
                                    px-3
                                    md:py-2
                                    md:px-6
                                    rounded-full">
                                Edit Profile
                            </button>
                                
                        </div>
                        {isLoadingUser ? <MoonLoader size={20 } color="#66FCF1"/> :<div className="flex flex-col items-center gap-2 w-11/12 pb-4">
                        
                            <img className={userData?.result?.photo ? "w-28 h-28 rounded-full object-cover" : "w-28 h-28 rounded-full bg-white object-cover"}
                                src={userData?.result?.photo ? userData?.result?.photo : "/images/Default_pfp.svg.png"} alt="" />
                            <div className="
                                            gap-1
                                            flex
                                            flex-col
                                            w-full
                                            items-center
                                            text-center
                                            overflow-hidden">
                
                                <h1 className="text-lg font-semibold text-white truncate">{userData?.result?.name}</h1>
                                <h2 className="text-gray-400 truncate">{userData?.result?.username}</h2>
                                <div className="flex items-center justify-center gap-2">
                                    {userData?.result?.location ? <IoLocationSharp size={20} color="gray" /> : null}
                                    <p className="text-gray-400">{userData?.result?.location ? userData?.result?.location : null}</p>
                                </div>
                                <p className="pt-1 w-3/4 text-gray-400 line-clamp-2">{userData?.result?.bio ? userData?.result?.bio : null}</p>
        
                            </div>
                            
                        </div>}
                        <hr className="h-px w-11/12 border-0 dark:bg-neutral-800"></hr>
                    </div>
                    
                    <div className="pt-4 w-full h-full flex gap-5 flex-col items-center">
                        
                        {postsUser && postsUser.map((post, index) => {
                            if (postsUser.length === index + 1) {
                                return <Post innerRef={lastEventElement} key={index} post={post} />
                            } else {
                                return <Post key={index} post={post}  />
                            }
                        }
                        )}
                        {isLoading ? <div className="flex items-center"><MoonLoader size={30 } color="#66FCF1"/></div>: null}
                    </div>
                    
                </div>
            </div>
        </div>

    )
}