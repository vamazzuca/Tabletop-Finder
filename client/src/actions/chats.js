
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
        dispatch({type: 'START_LOADING'})
        const { data } = await api.fetchChats(userID)
        
        dispatch({ type: 'FETCHCHATS', payload: data })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
    }
    
}

export const getChat = (chat) => async (dispatch) => {
 
    try {
        dispatch({type: 'START_LOADING'})
        let { data } = await api.fetchChat(chat)
        if (data.length === 0) {
            data = null
        }
        dispatch({ type: 'FETCHCHAT', payload: data })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
        
    }
    
}

export const joinChat = (chat) => async (dispatch) => {
    try {
        const { data } = await api.joinChat(chat)
        dispatch({ type: 'UPDATECHAT', payload: data})
    } catch (error) {
        console.log(error.message)
    }
    
}

export const leaveChat = (chat) => async (dispatch) => {
    try {
        
        const { data } = await api.leaveChat(chat)
        
        dispatch({ type: 'UPDATECHAT', payload: data})
    } catch (error) {
        console.log(error.message)
    }
    
}
