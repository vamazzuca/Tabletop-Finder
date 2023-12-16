import usePostModal from "../../hooks/usePostModel";
import { useNavigate } from "react-router-dom";
import Modal from "../modal";
import Search from "../search";
import { useCallback, useEffect, useState } from "react";
import Input from "../input";
import { useSelector, useDispatch } from "react-redux";
import { boardGameData, boardGameSearch } from "../../actions/boardgames";
import {Markup} from 'interweave'


function PostModal() {
    const postModal = usePostModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [search, setSearch] = useState("")
    const [boardgameID, setboardgameId] = useState("")
    const [date, setDate] = useState("")
    const [location, setLocation] = useState("")
    const [partySize, setPartySize] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const boardgames = useSelector((state) => state.boardgames)
    const regex = /(<([^>]+)>)/gi;
    
    useEffect(() => {
        if (!postModal.isOpen) {
            setSearch("")
            setboardgameId("")
        }
    }, [postModal])

    useEffect(() => {
        const formData = { id: boardgameID }
        dispatch(boardGameData(formData));
    
    }, [boardgameID, dispatch])
    
    const loadOptions = (inputValue) => {
        const formData = { query: inputValue }
        dispatch(boardGameSearch(formData));
        return {
            options: boardgames.boardgameSearchResults.result.item.map((game) => {
                return {
                    value: game.id ,
                    label: `${game.name.value.replace("&#039;", '')} (${game.yearpublished.value})`
                }
            })
        }
    }
        
    

    const onSubmit = useCallback(async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            navigate("/")
        
        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const handleChange = (value) => {
        setSearch(value)
        setboardgameId(value?.value)
    }

   
    

    const defaultDisplay = (
        <div className="flex pt-4">
            <div className="">
                <img className="w-[11rem] h-[11rem] object-none" src={boardgames.boardgameData?.result?.item?.thumbnail} alt="Thumbnail" />
            </div>
            <div className="flex-1 text-white px-4">
                <div className="flex font-bold text-2xl gap-2">
                    <Markup className="line-clamp-1" content={Array.isArray(boardgames?.boardgameData?.result?.item?.name) ?
                        boardgames?.boardgameData?.result?.item?.name[0].value :
                        boardgames?.boardgameData?.result?.item?.name.value}/>
                    <h2>({boardgames.boardgameData?.result?.item?.yearpublished?.value})</h2>
                </div>
                <div className=" h-[8rem] py-1 text-base line-clamp-5">
                    <>
                        
                        <Markup className='h-full' content={boardgames.boardgameData?.result?.item?.description}/>
                    </>
                </div>
                <div className="flex gap-6 pt-2">
                    <p>{boardgames.boardgameData?.result?.item?.minplayers.value}-{boardgames.boardgameData?.result?.item?.maxplayers.value} Players</p>
                    <p>{boardgames.boardgameData?.result?.item?.minplaytime.value}-{boardgames.boardgameData?.result?.item?.maxplaytime.value} Min</p>
                </div>
                
            </div>
           
        </div>
    )

    const bodyContent = (
        <div>
            <form className="flex flex-col gap-4">
                <Search
                    placeholder="Search Board Game..."
                    onChange={handleChange}
                    loadOptions={loadOptions}
                    value={search}
                    disabled={isLoading} />
                
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <Input
                            onChange={(e) => setDate(e.target.value)}
                            type={"datetime-local"}
                            value={date}
                            disabled={isLoading} />
                    </div>
                    <div className="w-1/2">
                        <Input
                            placeholder="Party Size"
                            onChange={(e) => setPartySize(e.target.value)}
                            value={partySize}
                            disabled={isLoading} />
                    </div>
                        
                </div>
                <Input
                    placeholder="Location"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    disabled={isLoading} />
                
                { boardgameID ? defaultDisplay : null }
                
                <div className='flex flex-col gap-2 pt-10'>
                            <button type="submit" className='
                                w-full
                                font-semibold
                                rounded-full
                                text-xl
                                px-4
                                py-2
                                transition
                                hover:opacity-80
                                bg-[#66FCF1]'>
                                    Post
                </button>
            </div>
            </form>
        </div>
    )

    const footerContent = (
       <div></div>
   )

    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={postModal.isOpen}
                title="Create Party"
                onClose={postModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerContent}/>
        </div>
    )
}

export default PostModal;