import * as api from '../api';

export const getPosts = (location) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const { data } = await api.fetchPosts(location)
        
        dispatch({ type: 'FETCH_ALL', payload: data })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
        dispatch({type: 'END_LOADING'})
    }
    
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const { data } = await api.fetchPostsBySearch(searchQuery)

        dispatch({ type: 'FETCH_BY_SEARCH', payload: data.data })
        dispatch({ type: 'FETCH_BY_SEARCH_USERS', payload: data.users })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error)
    }
}

export const getPostsByUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' })
        
        const { data } = await api.fetchPostsByUser(userId)
        
        dispatch({ type: 'FETCH_BY_USER', payload: data })
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message)
    }
    
}


export const getPostsByMember = (userId) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' })
        
        
        const { data } = await api.fetchPostsByMember(userId)
       
        dispatch({ type: 'FETCH_BY_MEMBER', payload: data })
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
        dispatch({type: 'END_LOADING'})
    }
    
}

export const reset = () => (dispatch) => {
    try {
        dispatch({ type: 'RESET'})
    } catch (error) {
        console.log(error)
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

export const deletePost = (id) => async (dispatch) => {
    try {
        
        await api.deletePost(id)
        
        dispatch({ type: 'DELETE_POST', payload: id })
    } catch (error) {
        console.log(error.message)
    }
    
}

export const createPost = (post, location) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        if (post.location === location) {
            dispatch({type: "CREATE", payload: data})
        }
        
    } catch (error) {
        console.log(error)
    }
}


export const joinEvent = (post) => async (dispatch) => {
    try {
        const { data } = await api.joinEvent(post);

        dispatch({type: "UPDATEEVENT", payload: data})
    } catch (error) {
        console.log(error)
    }
}


export const leaveEvent = (post) => async (dispatch) => {
    try {
        const { data } = await api.leaveEvent(post);
       
        dispatch({type: "UPDATEEVENT", payload: data})
    } catch (error) {
        console.log(error)
    }
}