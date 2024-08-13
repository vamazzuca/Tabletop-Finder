import * as api from '../api';
import { GETGAMEDATA, GETHOTGAMES} from '../constants/actionTypes'


export const boardGameData = (formData) => async (dispatch) =>{
    try {
        const { data } = await api.boardGameData(formData);
        dispatch({type: GETGAMEDATA, data})
    } catch (error) {
        console.log(error)
    }
}

export const hotBoardGames = () => async (dispatch) =>{
    try {
        const { data } = await api.hotBoardGames();
        dispatch({type: GETHOTGAMES, data})
    } catch (error) {
        console.log(error)
    }
}