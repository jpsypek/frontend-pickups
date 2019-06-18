import { connect } from 'react-redux'
import NewPickUpForm from '../../Components/NewPickUpForm/NewPickUpForm'

const mapStateToProps = (state) => {
  return {
    userLat: state.userLat,
    userLng: state.userLng,
    userId: state.userId
  }
}

export default connect(
  mapStateToProps
)(NewPickUpForm)
