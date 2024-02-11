import * as api from '../api';
import { GETUSER} from '../constants/actionTypes'


export const getUser = (formData) => async (dispatch) =>{
    try {
        const { data } = await api.getUser(formData);
        
        dispatch({type: GETUSER, data})
    } catch (error) {
        console.log(error)
    }
}