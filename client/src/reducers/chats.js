const chatReducer = (state = { chats: [], chat: []}, action) => {
    switch (action.type) {
        case 'FETCHCHATS':
            
            return { ...state, chats: action.payload };
        case 'FETCHCHAT':
            
            return { ...state, chat: action.payload };
        case 'CREATEGROUPCHAT':
            return {...state, chats: [...state.chats, action.payload] };
    
        default:
            return state;
    }
}

export default chatReducer;