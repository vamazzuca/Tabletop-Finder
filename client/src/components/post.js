
import { Markup } from 'interweave'
import dateFormat from 'dateformat'
import {  useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { joinEvent } from '../actions/posts';
import useLoginModal from '../hooks/useLoginModel';
import { joinChat } from '../actions/chats';
import { useEffect, useState } from 'react';

function Post({ post }) {
    const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();
    
    const loginModal = useLoginModal();

    useEffect(() => {
        setLoginUser(JSON.parse(localStorage.getItem('profile')))
       
    }, [])

    const joinhandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (loginUser) {
            dispatch(joinEvent({ userId: loginUser.result.id, eventId: post._id }))
            dispatch(joinChat({chatEventId: post.chatEventID, userId: loginUser.result.id}))
        } else {
            loginModal.onOpen();
        }
        

    }


    return (
        <Link className="w-8/12 lg:w-[30rem] cursor-pointer bg-[#1f2833] rounded-lg flex flex-col overflow-hidden" to={`/event/${post._id}`}>
            
                
                <div className="flex flex-col p-4 w-full gap-2">
                    <div className='flex gap-2 items-center'>
                        <img className="w-8 h-8 rounded-full bg-white" src="/images/Default_pfp.svg.png" alt="Rounded avatar" />
                        <h1 className='text-white text-sm md:text-base font-bold'>{post.creator.name}</h1>
                        
                        
                        <div className='flex gap-1 text-sm text-gray-400 md:text-base'>
                            <p>{post.creator.username}</p>
                            <p>&#8226;</p>
                            <p>{dateFormat(post.createdAt, "mmm dS")}</p>
                        </div>
                    
                    </div>
                    <div className=" w-full text-white text-base md:text-2xl font-bold  flex gap-2">
                        <Markup className="line-clamp-1" content={post.title } />
                        <h2>({post.year})</h2>
                    </div>
                </div>
            {<img className="h-auto md:min-h-[10rem] object-cover max-h-[36rem]" src={post.photo} alt="" loading="lazy" />}
                <div className='p-4 flex flex-col gap-2'>
                    <div className='flex justify-between gap-2'>
                        <div className="text-white text-sm md:text-xl flex  gap-2 md:gap-6">
                            <p>{post.description.minPlayers}-{post.description.maxPlayers} Players</p>
                            {post.description.minPlaytime === post.description.maxPlaytime ?
                            <p>{post.description.maxPlaytime} Min</p> :
                            <p>{post.description.minPlaytime}-{post.description.maxPlaytime} Min</p>}
                        </div>
                        <div className='text-white text-sm md:text-xl flex justify-end'>
                            <p>{post.members.length} / {post.size} Members</p>
                        </div>
                    </div>
                    
                    <div className='text-[10px] md:text-base flex text-gray-400'>
                            <div className='w-1/2'>
                                <p>{post.location} </p>
                                <p>{dateFormat(post.date, "mmm dS, yyyy, h:MM TT")}</p>
                            </div>
                            <div className='w-1/2 flex justify-end'>
                                <div className='relative'>
                            {post?.members?.some(member => member._id === loginUser?.result?.id) ?
                                <button disabled={true} className="
                                    absolute 
                                    bottom-0
                                    z-1
                                    right-0
                                    bg-[#A9A9A9]                               
                                    text-[#1f2833]
                                    font-bold
                                    py-2
                                    px-6
                                    rounded-full">Joined</button> :
                                
                                <button onClick={joinhandler} className="
                                    absolute 
                                    bottom-0
                                    z-1
                                    right-0
                                    bg-[#66FCF1]                               
                                    hover:bg-opacity-80
                                    active:bg-opacity-90
                                    text-[#1f2833]
                                    font-bold
                                    py-2
                                    px-6
                                    rounded-full">Join</button>}
                                </div>
                                
                            </div>
                            
                        
                    </div>
                </div>
                
            
                
                
            

        </Link>
    )
}

export default Post;


