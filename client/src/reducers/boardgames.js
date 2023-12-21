import { GETDATA } from '../constants/actionTypes';

const boardgameReducer = (state = {boardgameData: null}, action) => {
    switch (action.type) {
        case GETDATA:
            return { ...state, boardgameData: action?.data }
        default:
            return state;
    }
}

export default boardgameReducer;