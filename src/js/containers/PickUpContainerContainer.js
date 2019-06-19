import { connect } from 'react-redux'
import {
  updateEvents, addEvent, removeEvent,
  updateFilteredEvents, updateEventForDetail
 } from '../actions/index'
import PickUpContainer from '../../Components/PickUpContainer/PickUpContainer'

const mapStateToProps = (state) => {
  return {
    userLat: state.userLat,
    userLng: state.userLng,
    events: state.events,
    filteredEvents: state.filteredEvents,
    eventForDetail: state.eventForDetail
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
    },
    updateEventForDetail: event => {
      dispatch(updateEventForDetail(event))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickUpContainer)
