const userId = (state = "", action) => {
  switch(action.type) {
    case "ADD_USERID":
      return action.payload
    case "REMOVE_USERID":
      return ""
    default:
      return state
  }
}

export default userId
