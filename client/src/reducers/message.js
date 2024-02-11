const messageReducer = (state = { messages: []}, action) => {
    switch (action.type) {
        case 'FETCHMESSAGES':
            
            return { ...state, messages: action.payload };
        case 'ADDMESSAGE':

            const message = state.messages.find((message => message._id === action.payload._id))
            if (message) {
                return {...state, messages: [...state.messages] };
            } else {
                return {...state, messages: [...state.messages, action.payload] };
            }
            
            
        case 'SENDMESSAGE':
           
            return {...state, messages: [...state.messages, action.payload] };
    
        default:
            return state;
    }
}

export default messageReducer;