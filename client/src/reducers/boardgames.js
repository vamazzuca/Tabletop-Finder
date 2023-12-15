import { SEARCH } from '../constants/actionTypes';

const boardgameReducer = (state = {boardgameData: null}, action) => {
    switch (action.type) {
        case SEARCH:
            console.log(state)
            return { ...state, boardgameData: action?.data };
        default:
            return state;
    }
}

export default boardgameReducer;