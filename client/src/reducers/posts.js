
const postReducer = (state = { isLoading: false, posts: [], postsUser: [], postsSearch: [], users: []}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case 'FETCH_ALL':
            return { ...state, posts: mergePosts(state.posts, action.payload) };
        case 'FETCH_BY_USER':
            return { ...state, postsUser: mergePosts(state.postsUser, action.payload) };
        case 'FETCH_BY_SEARCH':
            return { ...state, postsSearch: mergePosts(state.postsSearch, action.payload) };
        case 'FETCH_BY_SEARCH_USERS':
            return { ...state, users: mergePosts(state.users, action.payload) };
        case 'FETCH_ALL_LOCATION':
            return { ...state, posts: action.payload };
        case 'FETCH_POST':
            return { ...state, post: action.payload };
        case 'JOINEVENT':
            const event = state.posts.find((event => event._id === action.payload._id))
            if (event) {
                event.members = action.payload.members
            }
            return { ...state, posts: [...state.posts] };
        case 'CREATE':
            return { ...state, posts: [...state.posts, action.payload] };
        case 'RESET':
            return { ...state, postsSearch: [], postsUser: [], users: [] };
        default:
            return state;
    }
};

const mergePosts = (existingPosts, newPosts) => {
    const idsSet = new Set(existingPosts.map(post => post._id));
    return [...existingPosts, ...newPosts.filter(post => !idsSet.has(post._id))];
};

export default postReducer;