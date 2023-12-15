import { combineReducers } from 'redux'

import postReducer from './posts'
import authReducer from './auth'
import boardgameReducer from './boardgames'

export default combineReducers({
    posts: postReducer,
    auth: authReducer,
    boardgames: boardgameReducer,
})