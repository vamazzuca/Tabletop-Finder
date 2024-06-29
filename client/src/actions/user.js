import * as api from '../api';
import { GETUSER, UPDATEUSER, GETUSERUPDATE} from '../constants/actionTypes'


export const getUser = (formData) => async (dispatch) =>{
    try {
        dispatch({type: 'START_LOADING'})
        const { data } = await api.getUser(formData);
        
        if (!data) {
            dispatch({ type: 'ERROR' });
        } else {
            dispatch({ type: GETUSER, data })
        }
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
        dispatch({ type: 'ERROR' });
        dispatch({type: 'END_LOADING'})
    }
}


export const updateUser = (user, updateModal) => async (dispatch) =>{
    try {
        const { data } = await api.updateUser(user);
       
        dispatch({ type: UPDATEUSER, data })
        updateModal.onClose()
    } catch (error) {
        console.log(error.message)
    }
}



export const getUserUpdate = (formData) => async (dispatch) =>{
    try {
        dispatch({type: 'START_LOADING'})
        const { data } = await api.getUser(formData);
        
        dispatch({ type: GETUSERUPDATE, data })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
        dispatch({ type: 'END_LOADING' });
    }
}