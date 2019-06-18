import { connect } from 'react-redux'
import { addUserLat, addUserLng, addUserId } from '../actions/index'
import App from '../../App'

const mapStateToProps = (state) => {
  return {
    userLat: state.userLat,
    userLng: state.userLng,
    userId: state.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserLat: userLat => {
      dispatch(addUserLat(userLat))
    },
    addUserLng: userLng => {
      dispatch(addUserLng(userLng))
    },
    addUserId: userId => {
      dispatch(addUserId(userId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
