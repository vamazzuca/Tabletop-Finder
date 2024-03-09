import { GETUSER, UPDATEUSER, START_LOADING, END_LOADING } from '../constants/actionTypes';

const userReducer = (state = {isLoadingUser: false, userData: null}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoadingUser: true }
        case END_LOADING:
            return { ...state, isLoadingUser: false }
        case GETUSER:
            return { ...state, userData: action?.data };
        case UPDATEUSER:
            
            return { ...state, userData: action?.data };
        default:
            return state;
    }
}

export default userReducer;