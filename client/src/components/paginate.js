import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";
import Post from "../components/post";
import useLocation from "../hooks/useLocation";
import { useInfiniteQuery } from "@tanstack/react-query";


export default function Paginate() {

    const dispatch = useDispatch();
    const [loginUser, setLoginUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const { location } = useLocation();

    useEffect(() => {
        setLoginUser(JSON.parse(localStorage.getItem('profile')))
    }, [dispatch, location])

    const posts = useSelector((state) => state.posts)


    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['query'],
        queryFn: ({ pageParam = 1 }) => {
            dispatch(getPosts({ location: location, page: pageParam }))
            return posts.posts
        },
        getNextPageParam: (_, pages) => {
            return pages.length + 1
        },
        initialdata: {
            pages: [posts.posts.slice(0, 5)],
            pageParams: [1]
        }
    }
    )


    return (
        <div className="pt-4 w-full h-full flex gap-5 flex-col items-center">
                        
            {data?.pages.map((page, i) => (
                <div key={i}>
                    {page.map((post, index) => <Post key={index} post={post} loginUser={loginUser} />)}
                </div>))}
            
            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ?
                    'Loading ore...' :
                    (data?.pages.length ?? 0) < 3 ?
                    'Load More': 'Nothing ore to load'}

            </button>
        </div>

  
    )
}