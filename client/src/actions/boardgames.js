import * as api from '../api';
import { SEARCH} from '../constants/actionTypes'

export const boardGameSearch = (formData) => async (dispatch) =>{
    try {
        const { data } = await api.searchBoardGame(formData);
        dispatch({type: SEARCH, data})
    } catch (error) {
        console.log(error)
    }
}