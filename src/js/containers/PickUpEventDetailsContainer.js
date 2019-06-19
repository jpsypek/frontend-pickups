import { connect } from 'react-redux'
import PickUpEventDetails from '../../Components/PickUpEventDetails/PickUpEventDetails'

const mapStateToProps = (state) => {
  return {
    eventForDetail: state.eventForDetail
  }
}

export default connect(
  mapStateToProps,
)(PickUpEventDetails)
