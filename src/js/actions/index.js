import { ADD_USERLAT, ADD_USERLNG, ADD_USERID, REMOVE_USERID } from '../constants/action-types'
import { UPDATE_EVENTS, ADD_EVENT, REMOVE_EVENT, UPDATE_FILTERED_EVENTS } from '../constants/action-types'


export const addUserLat = (payload) => ({
  type: ADD_USERLAT,
  payload
})

export const addUserLng = (payload) => ({
  type: ADD_USERLNG,
  payload
})

export const addUserId = (payload) => ({
  type: ADD_USERID,
  payload
})

export const removeUserId = (payload) => ({
  type: REMOVE_USERID,
  payload
})

export const updateEvents = (payload) => ({
  type: UPDATE_EVENTS,
  payload
})

export const addEvent = (payload) => ({
  type: ADD_EVENT,
  payload
})

export const removeEvent = (payload) => ({
  type: REMOVE_EVENT,
  payload
})

export const updateFilteredEvents = (payload) => ({
  type: UPDATE_FILTERED_EVENTS,
  payload
})
