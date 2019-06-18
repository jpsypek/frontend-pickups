import { ADD_USERLAT, ADD_USERLNG } from '../constants/action-types'


export const addUserLat = (payload) => ({
  type: ADD_USERLAT,
  payload
})

export const addUserLng = (payload) => ({
  type: ADD_USERLNG,
  payload
})
