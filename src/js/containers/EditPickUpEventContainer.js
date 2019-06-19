import { connect } from 'react-redux'
import { updateEventForDetail } from '../actions/index'
import EditPickUpEvent from '../../Components/EditPickUpEvent/EditPickUpEvent'

const mapStateToProps = (state) => {
  return {
    eventForDetail: state.eventForDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEventForDetail: event => {
      dispatch(updateEventForDetail(event))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPickUpEvent)
