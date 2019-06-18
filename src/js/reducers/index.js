import {combineReducers} from 'redux'
import userLatReducer from './userLat-reducer'
import userLngReducer from './userLng-reducer'
import userIdReducer from './userId-reducer'

const rootReducer = combineReducers({
  userLat: userLatReducer,
  userLng: userLngReducer,
  userId: userIdReducer
})

export default rootReducer
