import { GETGAMEDATA, GETHOTGAMES } from '../constants/actionTypes';

const boardgameReducer = (state = {boardgameData: null, hotBoardgamesData: null}, action) => {
    switch (action.type) {
        case GETGAMEDATA:
            return { ...state, boardgameData: action?.data }
        case GETHOTGAMES:
            return {...state, hotBoardgamesData: action?.data}
        default:
            return state;
    }
}

export default boardgameReducer;