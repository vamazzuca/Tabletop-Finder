import Header from "../components/header";
import Footer from "../components/footer/footer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPost } from "../actions/posts";
import { useParams } from "react-router";
import dateFormat from 'dateformat'
import { Markup } from 'interweave'
import MoonLoader from "react-spinners/MoonLoader";


function Event() {

    const dispatch = useDispatch();
    const { post, isLoading } = useSelector((state) => state.posts)
    
    const { id } = useParams();

    useEffect(() => {
        
        dispatch(getPost(id))
        
        
    }, [dispatch, id])

    

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
                            <div className='flex gap-2 items-center'>
                                <img className=" w-8 h-8 md:w-12 md:h-12 rounded-full bg-white" src="/images/Default_pfp.svg.png" alt="Rounded avatar" />
                                <h1 className='text-white text-sm md:text-lg font-bold'>{post?.creator?.name}</h1>
                                        
                                        
                                <div className='flex gap-1 text-sm text-gray-400 md:text-lg'>
                                    <p>{post?.creator?.username}</p>
                                    <p>&#8226;</p>
                                    <p>{dateFormat(post?.createdAt, "mmm dS")}</p>
                                </div>
                                    
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
                                <button className="
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
                                        rounded-full">Join</button>
                                      
                                    
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