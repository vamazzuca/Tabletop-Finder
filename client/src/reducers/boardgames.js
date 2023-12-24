import { GETGAMEDATA } from '../constants/actionTypes';

const boardgameReducer = (state = {boardgameData: null}, action) => {
    switch (action.type) {
        case GETGAMEDATA:
            return { ...state, boardgameData: action?.data }
        default:
            return state;
    }
}

export default boardgameReducer;