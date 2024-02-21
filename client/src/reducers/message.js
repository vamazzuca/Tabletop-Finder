const messageReducer = (state = {isLoading: true, messages: []}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return {...state, isLoading: false}
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