import { useDispatch, useSelector } from 'react-redux'
import { hotBoardGames } from '../../actions/boardgames';
import { useEffect } from 'react';

function HotGamesList() {

    
    const dispatch = useDispatch();
    
    const {hotBoardgamesData} = useSelector((state) => state.boardgames)


    useEffect(() => {
        dispatch(hotBoardGames())
    }, [dispatch])

    console.log(hotBoardgamesData)
    return (
        <div>

        </div>
    )
} 


export default HotGamesList;