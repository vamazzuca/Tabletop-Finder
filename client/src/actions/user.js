import * as api from '../api';
import { GETUSER, UPDATEUSER} from '../constants/actionTypes'


export const getUser = (formData) => async (dispatch) =>{
    try {
        const { data } = await api.getUser(formData);
        
        dispatch({type: GETUSER, data})
    } catch (error) {
        console.log(error)
    }
}


export const updateUser = (user, updateModal) => async (dispatch) =>{
    try {
        const { data } = await api.updateUser(user);
        
        dispatch({ type: UPDATEUSER, data })
        updateModal.onClose()
    } catch (error) {
        console.log(error)
    }
}