import {combineReducers} from 'redux'
import userLatReducer from './userLat-reducer'
import userLngReducer from './userLng-reducer'
import userIdReducer from './userId-reducer'
import eventsReducer from './events-reducer'
import filteredEventsReducer from './filteredEvents-reducer'
import eventForDetailReducer from './eventForDetail-reducer'

const rootReducer = combineReducers({
  userLat: userLatReducer,
  userLng: userLngReducer,
  userId: userIdReducer,
  events: eventsReducer,
  filteredEvents: filteredEventsReducer,
  eventForDetail: eventForDetailReducer
})

export default rootReducer
