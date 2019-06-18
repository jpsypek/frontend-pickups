const userLat = (state = "", action) => {
  switch(action.type) {
    case "ADD_USERLAT":
      return action.payload
    default:
      return state
  }
}

export default userLat
