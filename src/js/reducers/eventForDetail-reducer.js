const eventForDetail = (state = {}, action) => {
  switch(action.type) {
    case "UPDATE_EVENT_FOR_DETAIL":
      return action.payload
    default:
      return state
  }
}

export default eventForDetail
