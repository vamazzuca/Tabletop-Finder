
const postReducer = (state = { isLoading: false, isLoadingSearch: false, posts: [], postsUser: [], postsSearch: [], users: [], error: false, postsMember: []}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case 'START_LOADING_SEARCH':
            return { ...state, isLoadingSearch: true };
        case 'END_LOADING_SEARCH':
            return { ...state, isLoadingSearch: false };
        case 'FETCH_ALL':
            return { ...state, posts: mergePosts(state.posts, action.payload), error: false  };
        case 'FETCH_BY_USER':
            return { ...state, postsUser: mergePosts(state.postsUser, action.payload), error: false  };
        case 'FETCH_BY_SEARCH':
            return { ...state, postsSearch: mergePosts(state.postsSearch, action.payload), error: false  };
        case 'FETCH_BY_SEARCH_USERS':
            return { ...state, users: mergePosts(state.users, action.payload) };
        case 'FETCH_BY_MEMBER':
            
            return { ...state, postsMember: mergePosts(state.postsMember, action.payload) };
        case 'FETCH_ALL_LOCATION':
            return { ...state, posts: action.payload, error: false  };
        case 'FETCH_POST':
            return { ...state, post: action.payload, error: false };
        case 'UPDATEEVENT':
            const event = state.posts.find((event => event._id === action.payload._id))
            if (event) {
                event.members = action.payload.members
            }
            
            return { ...state, posts: [...state.posts], post: action.payload };
        case 'CREATE':
            return { ...state, posts: [action.payload, ...state.posts] };
        case 'DELETE':
            const updatedPosts = state.posts.filter(post => post._id !== action.payload);
            return { ...state, posts: updatedPosts };
        case 'ERROR':
            return { ...state, error: true, isLoading: false };
        case 'RESET':
            return { ...state, postsSearch: [], postsUser: [], users: [], error: false };
        default:
            return state;
    }
};

const mergePosts = (existingPosts, newPosts) => {
    const idsSet = new Set(existingPosts.map(post => post._id));
    return [...existingPosts, ...newPosts.filter(post => !idsSet.has(post._id))];
};

export default postReducer;