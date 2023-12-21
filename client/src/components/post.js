
import { Markup } from 'interweave'
import dateFormat from 'dateformat'

function Post({post}) {
    return (
        <div className="w-11/12 h-[15rem] bg-[#1f2833] rounded-lg flex p-6">
            <img className=" w-[4rem] h-[5rem] lg:w-[10rem] lg:h-[11rem] lg:object-none" src={post.thumbnail} alt="Thumbnail" loading="lazy" />
            <div className="flex flex-col pl-4 gap-2">
                <div className=" w-full text-white text-base lg:text-2xl font-bold  flex gap-2">
                    <Markup className="line-clamp-1" content={post.title } />
                    <h2>({post.year})</h2>
                </div>
               
                <div className='text-sm lg:text-base text-gray-400'>
                    <p>{post.location}</p>
                    <p>{dateFormat(post.date, "mmmm dS, yyyy, h:MM TT")}</p>
                   
                </div>
            </div>
            
            
        </div>
    )
}

export default Post;