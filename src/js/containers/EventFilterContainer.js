import { connect } from 'react-redux'
import { updateFilteredEvents } from '../actions/index'
import EventFilter from '../../Components/EventFilter/EventFilter'

const mapStateToProps = (state) => {
  return {
    userLat: state.userLat,
    userLng: state.userLng,
    events: state.events,
    filteredEvents: state.filteredEvents
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilteredEvents: events => {
      dispatch(updateFilteredEvents(events))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFilter)
