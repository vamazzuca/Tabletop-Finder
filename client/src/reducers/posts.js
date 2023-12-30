const postReducer = (state = { posts: []}, action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            
            return { ...state, posts: action.payload };
        case 'FETCH_POST':
            
            return { ...state, post: action.payload };
        case 'CREATE':
            return {...state, posts: [...state.posts, action.payload]};
    
        default:
            return state;
    }
}

export default postReducer;