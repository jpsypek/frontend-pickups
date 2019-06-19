const events = (state = [], action) => {
  switch(action.type) {
    case "UPDATE_EVENTS":
      return action.payload
    case "ADD_EVENT":
      return [...state, action.payload]
    case "REMOVE_EVENT":
      return state.filter((event) => event.id !== action.payload)
    default:
      return state
  }
}

export default events
