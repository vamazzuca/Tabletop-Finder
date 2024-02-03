
import * as api from '../api';


export const createGroupChat = (newChat) => async (dispatch) => {
    try {
        const { data } = await api.createGroupChat(newChat);

        dispatch({type: "CREATEGROUPCHAT", payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getChats = (userID) => async (dispatch) => {
    try {
        const { data } = await api.fetchChats(userID)
        
        dispatch({ type: 'FETCHCHATS', payload: data})
    } catch (error) {
        console.log(error.message)
    }
    
}

export const getChat = (chat) => async (dispatch) => {
    try {
        const { data } = await api.fetchChat(chat)
        
        dispatch({ type: 'FETCHCHAT', payload: data})
    } catch (error) {
        console.log(error.message)
    }
    
}