import usePostModal from "../../hooks/usePostModel";
import { useNavigate } from "react-router-dom";
import Modal from "../modal";
import Search from "../search";
import { useCallback, useEffect, useState } from "react";
import Input from "../input";
import { useSelector, useDispatch } from "react-redux";
import { boardGameData, boardGameSearch } from "../../actions/boardgames";
import { locationSearch } from "../../actions/location";
import { Markup } from 'interweave'
import MoonLoader from "react-spinners/MoonLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import debounce from 'lodash.debounce';

function PostModal() {
    const postModal = usePostModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [search, setSearch] = useState("")
    const [boardgameID, setboardgameId] = useState("")
    const [date, setDate] = useState(new Date())
    const [location, setLocation] = useState("")
    const [partySize, setPartySize] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [boardLoading, setBoardLoading] = useState(false)

    const boardgames = useSelector((state) => state.boardgames)
    const locationData = useSelector((state) => state.location)
    
    useEffect(() => {
        if (!postModal.isOpen) {
            setSearch("")
            setboardgameId("")
            setDate(new Date())
            setPartySize("")
        }
        setDate(new Date())
    }, [postModal])

    useEffect(() => {
        const formData = { id: boardgameID }
        dispatch(boardGameData(formData));
    
    }, [boardgameID, dispatch])

    useEffect(() => {
        setBoardLoading(false)
        if (boardgameID && !boardgames.boardgameData?.result?.item?.description) {
            setBoardLoading(true)
        }
    },[boardgameID, boardgames.boardgameData?.result?.item?.description])
    
    const loadOptionsBoardGames = (inputValue) => {
        const formData = { query: inputValue }
        dispatch(boardGameSearch(formData));
        console.log(boardgames)
        return {
            options: boardgames.boardgameSearchResults.result.item.map((game) => {
                return {
                    value: game.id ,
                    label: `${game.name.value.replace("&#039;", '')} (${game.yearpublished.value})`
                }
            })
        }
    }

    const loadOptionsLocation = (inputValue) => {
        const formData = { query: inputValue }
        setTimeout(() => {
            if (formData.query !== "") {
                dispatch(locationSearch(formData));
                
            } 
            console.log(locationData)
            
        }, 2000)
        return {
            options: locationData?.locationResults?.map((game) => {
                return {
                    value: game.name
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
                <img className="w-[11rem] h-[11rem] object-none" src={boardgames.boardgameData?.result?.item?.thumbnail} alt="Thumbnail" loading="lazy"/>
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
                    {boardgames.boardgameData?.result?.item?.minplaytime.value === boardgames.boardgameData?.result?.item?.maxplaytime.value ?
                    <p>{boardgames.boardgameData?.result?.item?.maxplaytime.value} Min</p> :
                    <p>{boardgames.boardgameData?.result?.item?.minplaytime.value}-{boardgames.boardgameData?.result?.item?.maxplaytime.value} Min</p>}
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
                    loadOptions={loadOptionsBoardGames}
                    value={search}
                    disabled={isLoading} />
                
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <DatePicker
                            onChange={(date) => setDate(date)}
                            selected={date}
                            disabled={isLoading}
                            showTimeSelect
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            wrapperClassName="w-full"
                            className="
                                w-full
                                p-4
                                text-lg
                                placeholder-white
                                bg-black
                                border-2
                                border-neutral-800
                                rounded-md
                                outline-none
                                text-white
                                focus:border-[#66FCF1]
                                focus:border-2
                                transition
                                disabled:bg-neutral-900
                                disabled:opacity-70
                                disabled:cursor-not-allowed"/>
                    </div>
                    <div className="w-1/2">
                        <Input
                            placeholder="Party Size"
                            onChange={(e) => setPartySize(e.target.value)}
                            value={partySize}
                            disabled={isLoading} />
                    </div>
                        
                </div>
                <Search
                    placeholder="Search Location..."
                    onChange={(e) => setLocation(e.target.value)}
                    loadOptions={loadOptionsLocation}
                    value={location}
                    disabled={isLoading} />
                
                <div className="flex justify-center">
                    { boardLoading ? <div className="flex h-[10rem] items-center"><MoonLoader color="#66FCF1"/></div> : boardgameID ? defaultDisplay : null }
                </div>
                
                
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