import { combineReducers } from 'redux'

import postReducer from './posts'
import authReducer from './auth'
import boardgameReducer from './boardgames'
import locationReducer from './location'

export default combineReducers({
    posts: postReducer,
    auth: authReducer,
    boardgames: boardgameReducer,
    location: locationReducer
})