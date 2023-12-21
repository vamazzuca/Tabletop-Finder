import * as api from '../api';
import { GETDATA} from '../constants/actionTypes'


export const boardGameData = (formData) => async (dispatch) =>{
    try {
        const { data } = await api.boardGameData(formData);
        dispatch({type: GETDATA, data})
    } catch (error) {
        console.log(error)
    }
}