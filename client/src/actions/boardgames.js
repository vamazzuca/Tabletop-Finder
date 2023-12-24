import * as api from '../api';
import { GETGAMEDATA} from '../constants/actionTypes'


export const boardGameData = (formData) => async (dispatch) =>{
    try {
        const { data } = await api.boardGameData(formData);
        dispatch({type: GETGAMEDATA, data})
    } catch (error) {
        console.log(error)
    }
}