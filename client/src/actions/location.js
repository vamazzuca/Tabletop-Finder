import * as api from '../api';
import { SEARCHLOCATION} from '../constants/actionTypes'

export const locationSearch = (formData) => async (dispatch) =>{
    try {
        const { data } = await api.locationSearch(formData);
        dispatch({type: SEARCHLOCATION, data})
    } catch (error) {
        console.log(error)
    }
}