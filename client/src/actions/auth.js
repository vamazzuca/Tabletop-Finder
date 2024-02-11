import * as api from '../api';
import { AUTH } from '../constants/actionTypes'


export const signIn = (formData, navigate, loginModal) => async (dispatch) =>{
    try {
        const { data } = await api.signIn(formData);
        dispatch({type: AUTH, data})
        loginModal.onClose()
        navigate("/")
        navigate(0)
    } catch (error) {
        console.log(error)
    }
}

export const signUp = (formData, navigate, registerModal) => async (dispatch) =>{
    try {
        
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data })
        registerModal.onClose();
        navigate("/")
        navigate(0)
    } catch (error) {
        console.log(error)
    }
}