import { GETDATA, SEARCH } from '../constants/actionTypes';

const boardgameReducer = (state = {boardgameSearchResults: null, boardgameData: null}, action) => {
    switch (action.type) {
        case SEARCH:
            return { ...state, boardgameSearchResults: action?.data };
        case GETDATA:
            return { ...state, boardgameData: action?.data }
        default:
            return state;
    }
}

export default boardgameReducer;