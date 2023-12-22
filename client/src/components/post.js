
import { Markup } from 'interweave'
import dateFormat from 'dateformat'

/* function Post({post}) {
    return (
        <div className="w-10/12 h-[12rem] bg-[#1f2833] rounded-lg flex">
            <img className=" w-[8rem] h-full md:w-[10rem] rounded-lg object-cover" src={post.photo} alt="Thumbnail" loading="lazy" />
            <div className="flex flex-col p-4 w-full gap-2">
                <div className=" w-full text-white text-base md:text-2xl font-bold  flex gap-2">
                    <Markup className="line-clamp-1" content={post.title } />
                    <h2>({post.year})</h2>
                </div>
               
                <div className='text-[10px] md:text-base text-gray-400'>
                    <p>{post.location}</p>
                    <p>{dateFormat(post.date, "mmm dS, yyyy, h:MM TT")}</p>
                   
                </div>
            </div>
            
            
        </div>
    )
} */

function Post({post}) {
    return (
        <div className="w-8/12 lg:w-[30rem] bg-[#1f2833] rounded-lg flex flex-col ">
            
            <div className="flex flex-col p-4 w-full gap-2">
                <div className=" w-full text-white text-base md:text-2xl font-bold  flex gap-2">
                    <Markup className="line-clamp-1" content={post.title } />
                    <h2>({post.year})</h2>
                </div>
            </div>
            <img className="h-full  max-h-[36rem] object-fit" src={post.photo} alt="Thumbnail" loading="lazy" />
            <div className='p-4 flex flex-col gap-2'>
                <div className="text-white text-sm md:text-xl flex gap-6">
                    <p>{post.description.minPlayers}-{post.description.maxPlayers} Players</p>
                    {post.description.minPlaytime === post.description.maxPlaytime ?
                    <p>{post.description.maxPlaytime} Min</p> :
                    <p>{post.description.minPlaytime}-{post.description.maxPlaytime} Min</p>}
                </div>
                <div className='text-[10px] md:text-base flex text-gray-400'>
                        <div className='w-1/2'>
                            <p>{post.location} </p>
                            <p>{dateFormat(post.date, "mmm dS, yyyy, h:MM TT")}</p>
                        </div>
                        <div className='w-1/2 flex justify-end'>
                            <div className='relative'>
                                <button className="absolute bottom-0 right-0 bg-violet-500 block hover:bg-violet-600 active:bg-violet-700 text-white font-bold py-2 px-6 rounded-full">Join</button>
                            </div>
                            
                        </div>
                        
                    
                </div>
            </div>
            
           
            
            
        </div>
    )
}

export default Post;


