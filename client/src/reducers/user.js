import { GETUSER, UPDATEUSER, START_LOADING, END_LOADING, GETUSERUPDATE, ERROR } from '../constants/actionTypes';

const userReducer = (state = {isLoadingUser: false, userData: null, updateData: null, error: false}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoadingUser: true }
        case END_LOADING:
            return { ...state, isLoadingUser: false }
        case GETUSER:
            return { ...state, userData: action?.data, error: false };
        case GETUSERUPDATE:
            return { ...state, updateData: action?.data, error: false };
        case UPDATEUSER:
           
            return { ...state, userData: action?.data, updateData: action?.data, error: false };
        case ERROR:
            return { ...state, error: true, loading: false };
        default:
            return state;
    }
}

export default userReducer;