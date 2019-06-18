const userId = (state = "", action) => {
  switch(action.type) {
    case "ADD_USERID":
      return action.payload
    default:
      return state
  }
}

export default userId
