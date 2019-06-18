import {combineReducers} from 'redux'
import userLatReducer from './userLat-reducer'
import userLngReducer from './userLng-reducer'

const rootReducer = combineReducers({
  userLat: userLatReducer,
  userLng: userLngReducer
})

export default rootReducer
