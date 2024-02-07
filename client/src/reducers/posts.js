const postReducer = (state = { posts: []}, action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            
            return { ...state, posts: action.payload };
        case 'FETCH_POST':
            
            return { ...state, post: action.payload };
        case 'JOINEVENT':
            
            const event = state.posts.find((event => event._id === action.payload._id))
            if (event) {
                event.members = action.payload.members
            }
            
           
            return { ...state, posts: [...state.posts]};
        case 'CREATE':
            return {...state, posts: [...state.posts, action.payload]};
    
        default:
            return state;
    }
}

export default postReducer;