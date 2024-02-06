
import * as api from '../api';



export const sendMessage = (message) => async (dispatch) => {
    try {
        const { data } = await api.sendMessage(message)
        
        dispatch({ type: 'SENDMESSAGE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
    
}


export const fetchMessages = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchMessages(id)
        
        dispatch({ type: 'FETCHMESSAGES', payload: data})
    } catch (error) {
        console.log(error.message)
    }
    
}