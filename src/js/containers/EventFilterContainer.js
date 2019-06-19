import { connect } from 'react-redux'
import { updateEvents, addEvent, removeEvent, updateFilteredEvents } from '../actions/index'
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
    updateEvents: events => {
      dispatch(updateEvents(events))
    },
    addEvent: event => {
      dispatch(addEvent(event))
    },
    removeEvent: eventId => {
      dispatch(removeEvent(eventId))
    },
    updateFilteredEvents: events => {
      dispatch(updateFilteredEvents(events))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFilter)
