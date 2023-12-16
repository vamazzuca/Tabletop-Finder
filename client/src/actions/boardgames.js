import * as api from '../api';
import { SEARCH, GETDATA} from '../constants/actionTypes'

export const boardGameSearch = (formData) => async (dispatch) =>{
    try {
        const { data } = await api.searchBoardGame(formData);
        dispatch({type: SEARCH, data})
    } catch (error) {
        console.log(error)
    }
}


export const boardGameData = (formData) => async (dispatch) =>{
    try {
        const { data } = await api.boardGameData(formData);
        dispatch({type: GETDATA, data})
    } catch (error) {
        console.log(error)
    }
}