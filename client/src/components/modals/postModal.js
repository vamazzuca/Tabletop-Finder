import usePostModal from "../../hooks/usePostModel";
import { useNavigate } from "react-router-dom";
import Modal from "../modal";
import Search from "../search";
import { useCallback, useEffect, useState } from "react";


function PostModal() {
    const postModal = usePostModal();
    const navigate = useNavigate();

    const [search, setSearch] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    

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


    const bodyContent = (
        <div>
            <form>
                <Search
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    disabled={isLoading}/>
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