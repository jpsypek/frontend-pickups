const filteredEvents = (state = [], action) => {
  switch(action.type) {
    case "UPDATE_FILTERED_EVENTS":
      return action.payload
    default:
      return state
  }
}

export default filteredEvents
