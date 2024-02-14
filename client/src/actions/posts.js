import * as api from '../api';

export const getPosts = (location) => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(location)
        
        dispatch({ type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.log(error.message)
    }
    
}

export const getPost = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchPost(id)
        
        dispatch({ type: 'FETCH_POST', payload: data})
    } catch (error) {
        console.log(error.message)
    }
    
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({type: "CREATE", payload: data})
    } catch (error) {
        console.log(error)
    }
}


export const joinEvent = (post) => async (dispatch) => {
    try {
        const { data } = await api.joinEvent(post);

        dispatch({type: "JOINEVENT", payload: data})
    } catch (error) {
        console.log(error)
    }
}