import * as api from '../api';

export const getPosts = (location) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const { data } = await api.fetchPosts(location)
        
        dispatch({ type: 'FETCH_ALL', payload: data })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
    }
    
}

export const getPostsByUser = (userId) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const { data } = await api.fetchPostsByUser(userId)
        
        dispatch({ type: 'FETCH_BY_USER', payload: data })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
    }
    
}

export const getPostsLocation = (location) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const { data } = await api.fetchPosts(location)
        
        dispatch({ type: 'FETCH_ALL_LOCATION', payload: data })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
    }
    
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const { data } = await api.fetchPost(id)
        
        dispatch({ type: 'FETCH_POST', payload: data })
        dispatch({type: 'END_LOADING'})
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