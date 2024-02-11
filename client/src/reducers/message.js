const messageReducer = (state = { messages: []}, action) => {
    switch (action.type) {
        case 'FETCHMESSAGES':
            
            return { ...state, messages: action.payload };
        case 'ADDMESSAGE':
            return {...state, messages: [...state.messages, action.payload] };
        case 'SENDMESSAGE':
           
            return {...state, messages: [...state.messages, action.payload] };
    
        default:
            return state;
    }
}

export default messageReducer;