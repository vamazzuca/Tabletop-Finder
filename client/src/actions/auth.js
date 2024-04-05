import * as api from '../api';
import { AUTH } from '../constants/actionTypes'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const notify = (errorMessage) => {
    toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
};

export const signIn = (formData, navigate, loginModal) => async (dispatch) =>{
    try {
        const { data } = await api.signIn(formData);
        dispatch({type: AUTH, data})
        loginModal.onClose()
        navigate("/")
        navigate(0)
    } catch (error) {
        
        notify(error.response.data.message || "An error occurred")
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
        notify(error.response.data.message || "An error occurred")
    }
}