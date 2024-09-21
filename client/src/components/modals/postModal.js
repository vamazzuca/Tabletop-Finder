import usePostModal from "../../hooks/usePostModel";
import { useNavigate } from "react-router-dom";
import Modal from "../modal";
import Search from "../search";
import { useCallback, useEffect, useState } from "react";
import Input from "../input";
import { useSelector, useDispatch } from "react-redux";
import { boardGameData } from "../../actions/boardgames";
import { createPost } from "../../actions/posts";
import { createGroupChat } from "../../actions/chats";
import { Markup } from 'interweave'
import MoonLoader from "react-spinners/MoonLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as api from '../../api';
import { v4 as uuidv4 } from 'uuid';
import useLocationSelector from "../../hooks/useLocation";

function PostModal() {
    const postModal = usePostModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [search, setSearch] = useState("")
    const [boardgameID, setboardgameId] = useState("")
    const [date, setDate] = useState(new Date())
    const [postLocation, setPostLocation] = useState("")
    const [partySize, setPartySize] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [boardLoading, setBoardLoading] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile-tabletop')));

    const boardgames = useSelector((state) => state.boardgames)
    const result = boardgames?.boardgameData?.result;
    
    const { location } = useLocationSelector()
    
    useEffect(() => {
        if (!postModal.isOpen) {
            setSearch("");
            setboardgameId("");
            setPartySize("");
            setPostLocation("");
        }
        setDate(new Date())
        setUser(JSON.parse(localStorage.getItem('profile-tabletop')));
    }, [postModal])

    useEffect(() => {
        const formData = { id: boardgameID }
        dispatch(boardGameData(formData));
    
    }, [boardgameID, dispatch])

    useEffect(() => {
        setBoardLoading(false)
        if (boardgameID && !boardgames.boardgameData?.result?.item?.description) {
            setBoardLoading(true);
        }
    },[boardgameID, boardgames.boardgameData?.result?.item?.description])
    
    const loadOptionsBoardGames = async(inputValue) => {
        const formData = { query: inputValue }
        
        if (!formData.query) {
            return {
                options : []
            }
        }

        const { data } = await api.searchBoardGame(formData);
        
        const result = data?.result?.item
        
        if (result) {
            
            return {
                options: result.slice(0, 20).map((game) => {
                    
                    return {
                        value: game.id ,
                        label: `${game.name.value.replace("&#039;", '')} (${game?.yearpublished?.value})`
                    }
                })
            }
        } else {
            
            return {
                options : []
            }
        }
            
    }


    const loadOptionsLocation = async (inputValue) => {
       
        const formData = { query: inputValue }

        if (!formData.query) {
            return {
                options : []
            }
        }
        const { data } = await api.locationSearch(formData);
       
        
        if (data?.result) {
            
            return {
                options: data?.result.slice(0, 20).map((location) => {
                    return {
                        value: location.key,
                        label: `${location.name}, ${location.country}`
                    }
                })
            }
        } else {
            return {
                options : []
            }
        }
        
    }

    const promiseLocationOptions = (inputValue) =>
        new Promise((resolve) => {
        setTimeout(() => {
            resolve(loadOptionsLocation(inputValue));
        }, 1000);
    });
    
    const promiseBoardOptions = (inputValue) =>
        new Promise((resolve) => {
        setTimeout(() => {
            resolve(loadOptionsBoardGames(inputValue));
        }, 1000);
    });


    const onSubmit = useCallback(async (e) => {
        
        try {
            setIsLoading(true);
            e.preventDefault();

            if (parseInt(partySize) <= 0 || parseInt(partySize) > result.item.maxplayers.value) {
                throw new Error('Party Size out of bounds')
            } 

            const chatEventID = uuidv4();
            
            const post = {
                title: Array.isArray(result?.item?.name) ? result?.item?.name[0].value : result?.item?.name.value,
                year: result.item.yearpublished.value,
                thumbnail: result.item.thumbnail,
                location: postLocation.label,
                creator: user.result.id,
                photo: result.item.image,
                chatEventID: chatEventID,
                date: date,
                size: parseInt(partySize),
                members: [user.result.id],
                description: {
                    description: result.item.description,
                    minPlayers: result.item.minplayers.value,
                    maxPlayers: result.item.maxplayers.value,
                    minPlaytime: result.item.minplaytime.value,
                    maxPlaytime: result.item.maxplaytime.value}
            }
            

            const groupChat = {
                senderId: user.result.id,
                groupName: Array.isArray(result?.item?.name) ? result?.item?.name[0].value : result?.item?.name.value,
                date: date,
                chatEventID: chatEventID,
                year: result.item.yearpublished.value
            }

            dispatch(createGroupChat(groupChat))
            dispatch(createPost(post, location));
            postModal.onClose();
            navigate("/");
        
        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [navigate, dispatch, result, postLocation, user, date, partySize, postModal, location]);

    const handleChange = (value) => {
        setSearch(value)
        setboardgameId(value?.value)
    }

    const handleLocationChange = (value) => {
        setPostLocation(value)
    }

   
    const defaultDisplay = (
        <div className="flex pt-4">
            <div className="">
                <img className="w-[11rem] h-[11rem] object-none" src={result?.item?.thumbnail} alt="Thumbnail" loading="lazy"/>
            </div>
            <div className="flex-1 text-white px-4">
                <div className="flex font-bold text-2xl gap-2">
                    <Markup className="line-clamp-1" content={Array.isArray(result?.item?.name) ?
                        result?.item?.name[0]?.value :
                        result?.item?.name?.value}/>
                    <h2>({result?.item?.yearpublished?.value})</h2>
                </div>
                <div className=" h-[8rem] py-1 text-base line-clamp-5">
                    <>
                        
                        <Markup className='h-full' content={result?.item?.description}/>
                    </>
                </div>
                <div className="flex gap-6 pt-2">
                    <p>{result?.item?.minplayers?.value}-{result?.item?.maxplayers?.value} Players</p>
                    {result?.item?.minplaytime?.value === result?.item?.maxplaytime?.value ?
                    <p>{result?.item?.maxplaytime?.value} Min</p> :
                    <p>{result?.item?.minplaytime?.value}-{result?.item?.maxplaytime?.value} Min</p>}
                </div>
                
            </div>
           
        </div>
    )

    const bodyContent = (
        <div>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <Search
                    placeholder="Search Board Game..."
                    onChange={handleChange}
                    loadOptions={promiseBoardOptions}
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
                            required={true}
                            maxLength={3}
                            value={partySize}
                            disabled={isLoading} />
                    </div>
                        
                </div>
                <Search
                    placeholder="Search City..."
                    onChange={handleLocationChange}
                    loadOptions={promiseLocationOptions}
                    value={postLocation}
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
                                text-[#0B0C10]
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
                title="Create Event"
                onClose={postModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerContent}/>
        </div>
    )
}

export default PostModal;