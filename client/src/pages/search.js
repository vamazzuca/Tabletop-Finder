import Header from "../components/header"
import { useState, useRef, useCallback } from "react"
import { useNavigate, useLocation } from "react-router";
import { getPostBySearch } from "../actions/posts";
import { useSelector, useDispatch  } from "react-redux";
import { useEffect } from "react";
import useLocationSelector from "../hooks/useLocation";
import Post from "../components/post";
import MoonLoader from "react-spinners/MoonLoader";


function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function Search() {

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('events')
    const [pageNumber, setPageNumber] = useState(1)
    
    const { location } = useLocationSelector()
    const { posts, isLoading } = useSelector((state) => state.posts)
    
    const query = useQuery();
    const navigate = useNavigate();
    const searchQuery = query.get('searchQuery')
    const dispatch = useDispatch()
    const divRef = useRef(null);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const scrollToRef = () => {
        divRef.current.scroll({
          top: 0
        });
      }

    useEffect(() => {
       
        if (searchQuery) {
            setSearch(searchQuery)
            dispatch(getPostBySearch({ search: searchQuery, location }))
            scrollToRef()
        }
        
        
    }, [searchQuery, dispatch, location])
    
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

    const searchPost = () => {
        if (search.trim()) {
            dispatch(getPostBySearch({ search, location }))
            navigate(`/search?searchQuery=${search || 'none'}`)
        } else {
            navigate('/search')
        }
    }

    return (
        <div ref={divRef} className="h-screen col-span-3 overflow-y-scroll flex grid grid-cols-3">
                <div className="h-full xl:px-30 col-span-3 xl:col-span-2"> 
                
                <div className="flex h-full flex-col items-center">
                    <div className="w-11/12 sticky z-10 top-0 bg-[#0B0C10]">
                        <Header
                            showLocation={true}
                            showFooter={true}
                            showSearch={true}
                            search={search}
                            setFilter={setFilter}
                            setSearch={setSearch}
                            handleKeyPress={handleKeyPress} />
                        <hr className="h-px w-full border-0 dark:bg-neutral-800"></hr>
                    </div>

                    <div className="pt-4 w-full h-full flex gap-5 flex-col items-center">
                        
                        {posts && posts.map((post, index) => {
                            if (posts.length === index + 1) {
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

        </div>
    )
}