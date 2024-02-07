const chatReducer = (state = { chats: [], chat: []}, action) => {
    switch (action.type) {
        case 'FETCHCHATS':
            
            return { ...state, chats: action.payload };
        case 'FETCHCHAT':
            
            return { ...state, chat: action.payload };
        case 'JOINCHAT':
            
            const chat = state.posts.find((chat => chat._id === action.payload._id))
            if (chat) {
                chat.users = action.payload.users
            }
            
            return { ...state, chats: [...state.chats]};
        case 'CREATEGROUPCHAT':
            return {...state, chats: [...state.chats, action.payload] };
    
        default:
            return state;
    }
}

export default chatReducer;