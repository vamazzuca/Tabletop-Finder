import usePostModal from "../../hooks/usePostModel";
import { useNavigate } from "react-router-dom";
import Modal from "../modal";
import Search from "../search";
import { useCallback, useEffect, useState } from "react";
import Input from "../input";
import { useSelector, useDispatch } from "react-redux";
import { boardGameSearch } from "../../actions/boardgames";


function PostModal() {
    const postModal = usePostModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [search, setSearch] = useState("")
    const [date, setDate] = useState("")
    const [location, setLocation] = useState("")
    const [partySize, setPartySize] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const boardgames = useSelector((state) => state.boardgames)
    

    
    const loadOptions = (inputValue) => {
        const formData = { query: inputValue }
        dispatch(boardGameSearch(formData));
        return {
            options: boardgames.boardgameData.result.item.map((game) => {
                return {
                    value: game.id ,
                    label: `${game.name.value} (${game.yearpublished.value})`
                }
            })
        }
    }
    

    const onSubmit = useCallback(async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            
        
        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleChange = (value) => {
        setSearch(value)
    }

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