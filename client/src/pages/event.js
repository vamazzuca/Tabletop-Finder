import Header from "../components/header";
import Footer from "../components/footer/footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPost } from "../actions/posts";
import { useParams } from "react-router";
import dateFormat from 'dateformat'
import { Markup } from 'interweave'
import MoonLoader from "react-spinners/MoonLoader";
import { joinEvent } from '../actions/posts';
import { joinChat } from '../actions/chats';
import useLoginModal from '../hooks/useLoginModel';
import { deletePost } from "../actions/posts";
import { useNavigate } from "react-router";
import { leaveEvent } from "../actions/posts";
import { leaveChat } from "../actions/chats";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const notify = (errorMessage) => {
    toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
};

function Event() {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();
    const { post, isLoading } = useSelector((state) => state.posts)
    const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const loginModal = useLoginModal();
    const navigate = useNavigate();
    
    const { id } = useParams();

    useEffect(() => {
        
        dispatch(getPost(id))
      
    }, [dispatch, id])

    useEffect(() => {
        setLoginUser(JSON.parse(localStorage.getItem('profile')))
       
    }, [])

    const joinhandler = () => {
    
        if (loginUser && post.members.length < post.size) {
            dispatch(joinEvent({ userId: loginUser.result.id, eventId: post._id }))
            dispatch(joinChat({chatEventId: post.chatEventID, userId: loginUser.result.id}))
        } else if (!loginUser) {
            loginModal.onOpen();
        } else if (post.members.length === post.size) {
            notify("Event Full")
        }
        

    }


    const handleDelete = () => {
        dispatch(deletePost(post._id))
        dispatch(leaveChat({chatEventId: post.chatEventID, userId: loginUser.result.id}))
        navigate("/")
    }

    const leaveHandler = () => {
    
        dispatch(leaveEvent({ userId: loginUser.result.id, eventId: post._id }))
        dispatch(leaveChat({chatEventId: post.chatEventID, userId: loginUser.result.id}))
    }

    return (
        < div className = "h-screen col-span-4 sm:col-span-3 overflow-y-scroll flex grid grid-cols-3" >
            <div className="h-full xl:px-30 col-span-3 xl:col-span-2"> 
                
                <div className="flex h-full flex-col items-center">
                        <div className="w-11/12 sticky z-10 top-0 bg-[#0B0C10]">
                            <Header label="Event" showBackArrow={true}/>
                            <hr className="h-px w-full border-0 dark:bg-neutral-800"></hr>
                        </div>
                        
                    {isLoading ? <div className="flex mt-4 items-center"><MoonLoader size={50} color="#66FCF1" /></div> :
                        <div className="mt-4 mb-4 flex flex-col w-10/12 h-full border-2 border-neutral-800 rounded-lg overflow-hidden">
                        <div className="flex flex-col p-4 w-full gap-2">
                                <div className='flex gap-2 items-center justify-between'>
                                    <div className="flex gap-2 items-center">
                                        <img className={post?.creator.photo ? "w-8 h-8  md:w-12 md:h-12 rounded-full object-cover" : "w-8 h-8  md:w-12 md:h-12 rounded-full bg-white object-cover"}
                                            src={post?.creator.photo ? post?.creator.photo : "/images/Default_pfp.svg.png"} alt="" />
                                       
                                        <h1 className='text-white text-sm md:text-lg font-bold'>{post?.creator?.name}</h1>
                                            
                                            
                                        <div className='flex gap-1 text-sm text-gray-400 md:text-lg'>
                                            <p>{post?.creator?.username}</p>
                                            <p>&#8226;</p>
                                            <p>{dateFormat(post?.createdAt, "mmm dS")}</p>
                                        </div>
                                    </div>
                                
                                    {post?.members.find(mem => mem._id === loginUser?.result?.id) ? <div className="relative">
                                        <button onClick={() => setIsOpen((prev) => !prev)} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100  focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-[#0B0C10] dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                            </svg>
                                            
                                        </button>
                                        {isOpen && post.creator._id === loginUser?.result?.id && (
                                            <div onClick={handleDelete} className="bg-[#FF0000] hover:bg-opacity-80 text-black font-semibold cursor-pointer absolute rounded-lg text-lg p-2 top-10 right-[1px]">
                                                <h1>Delete</h1>
                                            </div>
                                        )}
                                        {isOpen && post.creator._id !== loginUser?.result?.id && (
                                            <div onClick={leaveHandler} className="bg-[#FF0000] hover:bg-opacity-80 text-black font-semibold cursor-pointer absolute rounded-lg text-lg p-2 top-10 right-[1px]">
                                                <h1>Leave</h1>
                                            </div>
                                        )}
                                    </div>: null}
                                    
                                    
                            </div>
                            
                            <div className=" w-full text-white text-base md:text-3xl font-bold  flex gap-2">
                                <Markup className="line-clamp-1" content={post?.title} />
                                <h2>({post?.year})</h2>
                            </div>

                        </div>
                                    
                        <img className=" w-full object-cover" src={post?.photo} alt="Thumbnail" loading="lazy" />
                        
                        <div className='p-4 flex flex-col gap-2 md:gap-8'>
                            <div className="text-white text-sm md:text-2xl gap-4 flex md:gap-12">
                                <div className="flex flex-col gap-1">
                                    <p>Recommended Players:</p>
                                    <p>{post?.description.minPlayers}-{post?.description.maxPlayers} Players</p>
                                </div>
                                        
                                <div className="flex flex-col gap-1">
                                    <p>Playing Time:</p>
                                    {post?.description.minPlaytime === post?.description.maxPlaytime ?
                                        <p>{post?.description.maxPlaytime} Min</p> :
                                        <p>{post?.description.minPlaytime}-{post?.description.maxPlaytime} Min</p>}
                                </div>
                                        
                            </div>
                            
                            <div className='text-sm md:text-2xl flex text-white'>
                                <div className="flex flex-col gap-2 md:gap-8">
                                    <div>
                                        <p>Location: </p>
                                        <p>{post?.location} </p>
                                    </div>
                                        
                                    <div>
                                        <p>Date & Time: </p>
                                        <p>{dateFormat(post?.date, "mmm dS, yyyy, h:MM TT")}</p>
                                    </div>
                                        
                                </div>
                                    
                            </div>
                                
                            <div className='text-white text-sm md:text-2xl items-center flex gap-4 md:gap-6'>
                                    
                                    <p>{post?.members.length} / {post?.size} Members</p>
                                    
                                    {post?.members?.some(member => member._id === loginUser?.result?.id) ?
                                            <button disabled={true} className="
                                            bg-[#A9A9A9]  
                                            text-[#1f2833]
                                            font-bold
                                            text-[15px]
                                            py-1
                                            px-3
                                            md:text-[20px]
                                            md:py-2
                                            md:px-6
                                            rounded-full">Joined</button> :
                                                <button onClick={joinhandler} className="
                                                bg-[#66FCF1]                               
                                                hover:bg-opacity-80
                                                active:bg-opacity-90
                                                text-[#1f2833]
                                                font-bold
                                                text-[15px]
                                                py-1
                                                px-3
                                                md:text-[20px]
                                                md:py-2
                                                md:px-6
                                                rounded-full">Join</button>}
                                      
                                    
                            </div>

                            <div className="text-white flex flex-col gap-2">
                                <p className="text-sm md:text-2xl">Description: </p>
                                <Markup className="text-sm md:text-base" content={post?.description.description} />
                            </div>
                        </div>
                    </div>}
                    
                            
                        
                    </div>

                    
                
                </div>
            <Footer/>
        </div >
    )
}

export default Event;