const chatReducer = (state = { isLoading: false, chats: [], chat: [], error: false}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return {...state, isLoading: false}
        case 'FETCHCHATS':
            
            return { ...state, chats: action.payload , error: false};
        case 'FETCHCHAT':
            
            return { ...state, chat: action.payload, error: false };
        case 'UPDATECHAT':
            
            const chat = state.chats.find((chat => chat._id === action.payload._id))
            if (chat) {
                chat.users = action.payload.users
            }
            
            return { ...state, chats: [...state.chats] };
        case 'LEAVECHAT':
            return { ...state, chats: state.chats.filter(chat => chat._id !== action.payload._id) }
        case 'ERROR':
            return { ...state, error: true, isLoading: false };
        case 'CREATEGROUPCHAT':
            return {...state, chats: [...state.chats, action.payload] };
    
        default:
            return state;
    }
}

export default chatReducer;