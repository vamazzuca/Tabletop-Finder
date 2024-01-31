import { GETUSER } from '../constants/actionTypes';

const userReducer = (state = {userData: null}, action) => {
    switch (action.type) {
        case GETUSER:
            return { ...state, userData: action?.data };
        default:
            return state;
    }
}

export default userReducer;