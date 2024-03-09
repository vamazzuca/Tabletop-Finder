
import * as api from '../api';


export const addMessage = (payload) => ({ type: 'ADDMESSAGE', payload });

export const sendMessage = (message, socket) => async (dispatch) => {
    try {
        const { data } = await api.sendMessage(message)
        socket.emit("new message", data);
        dispatch({ type: 'SENDMESSAGE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
    
}


export const fetchMessages = (id, socket) => async (dispatch) => {
    try {
        const { data } = await api.fetchMessages(id)
        socket.emit("join chat", id)
        dispatch({ type: 'FETCHMESSAGES', payload: data})
    } catch (error) {
        console.log(error.message)
    }
    
}


