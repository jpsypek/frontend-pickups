const userLng = (state = "", action) => {
  switch(action.type) {
    case "ADD_USERLNG":
      return action.payload
    default:
      return state
  }
}

export default userLng
