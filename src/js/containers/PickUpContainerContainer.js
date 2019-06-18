import { connect } from 'react-redux'
import PickUpContainer from '../../Components/PickUpContainer/PickUpContainer'

const mapStateToProps = (state) => {
  return {
    userLat: state.userLat,
    userLng: state.userLng}
}

export default connect(
  mapStateToProps
)(PickUpContainer)
