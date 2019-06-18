import { connect } from 'react-redux'
import { addUserLat } from '../actions/index'
import { addUserLng } from '../actions/index'
import App from '../../App'

const mapStateToProps = (state) => {
  return {
    userLat: state.userLat,
    userLng: state.userLng}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserLat: userLat => {
      dispatch(addUserLat(userLat))
    },
    addUserLng: userLng => {
      dispatch(addUserLng(userLng))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
