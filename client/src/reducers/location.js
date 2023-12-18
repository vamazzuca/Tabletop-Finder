import { SEARCHLOCATION } from '../constants/actionTypes';

const locationReducer = (state = {locationResults: {}}, action) => {
    switch (action.type) {
        case SEARCHLOCATION:
            return { ...state, locationResults: action?.data };
        default:
            return state;
    }
}

export default locationReducer;