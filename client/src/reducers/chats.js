const chatReducer = (state = { chats: []}, action) => {
    switch (action.type) {
        case 'FETCHCHATS':
            
            return { ...state, chats: action.payload };
        case 'CREATEGROUPCHAT':
            return {...state, chats: [...state.chats, action.payload] };
    
        default:
            return state;
    }
}

export default chatReducer;