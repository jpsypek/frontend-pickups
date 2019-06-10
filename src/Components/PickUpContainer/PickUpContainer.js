import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import './PickUpContainer.css'
import PickUpEvent from '../PickUpEvent/PickUpEvent'
import EventFilter from '../EventFilter/EventFilter'
import PickUpEventDetails from '../PickUpEventDetails/PickUpEventDetails'
import EditPickUpEvent from '../EditPickUpEvent/EditPickUpEvent'
import { getEventsFetch } from '../../utility/fetch'
import star from '../../markers/star.png'

class PickUpContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      filteredEvents: [],
      eventForDetail: {},
      showEventDetail: false,
      showEventEdit: false
    }
  }

  componentDidMount = () => {
    this.getEvents()
  }

  getEvents = () => {
    if (this.props.loggedIn) {
      getEventsFetch()
        .then(response => response.json())
        .then(events => this.setState({events, filteredEvents: events}))
        .catch(error=>console.error(error))
    }
  }

  updateUsers = (eventId, user) => {
    const { events } = this.state
    const eventToUpdate = events.find((event) => event.id === eventId)
    eventToUpdate.users.push(user)
    const unchangedEvents = events.filter((event) => event.id !== eventId)

    this.setStateWithUpdatedEvent(unchangedEvents, eventToUpdate)
  }

  removeUser = (eventId, userId) => {
    const { events } = this.state
    const eventToUpdate = events.find((event) => event.id === eventId)
    const unchangedEvents = events.filter((event) => event.id !== eventId)
    const eventWithRemovedUser = eventToUpdate.users.filter((user) => user.id !== userId)

    this.setStateWithUpdatedEvent(unchangedEvents, eventWithRemovedUser)
  }

  updateEvent = (updatedEvent) => {
    const { events } = this.state
    const unchangedEvents = events.filter((event) => event.id !== updatedEvent.id)
    this.setStateWithUpdatedEvent(unchangedEvents, updatedEvent)
    this.toggleShowEventEdit({})
  }

  setStateWithUpdatedEvent = (unchangedEvents, updatedEvent) => {
    this.setState({events: [...unchangedEvents, updatedEvent]})
    this.getEvents()
    this.toggleShowEventDetails()
  }

  removeEvent = (eventId) => {
    const { events } = this.state
    const updatedEvents = events.filter((event) => event.id !== eventId)

    this.setState({events: updatedEvents})
    this.getEvents()
    this.toggleShowEventDetails()
  }

  toggleShowEventDetails = (event) => {
    this.setState({
      eventForDetail: event,
      showEventDetail: !this.state.showEventDetail
    })
  }

  toggleShowEventEdit = () => {
    this.setState({showEventEdit: !this.state.showEventEdit})
  }

  render() {
    const { loggedIn, userLat, userLng } = this.props
    const { events, showEventDetail, eventForDetail, showEventEdit } = this.state
    const API_KEY = process.env.REACT_APP_MAPS_API_KEY
    const eventItems = events.map((event) => {
      return <PickUpEvent
        key={event.id + Date.now()}
        lat={event.latitude}
        getEvents={this.getEvents}
        lng={event.longitude}
        toggleShowEventDetails={this.toggleShowEventDetails}
        event={event}
      />
    })

    return(
      <React.Fragment >
        {loggedIn ?
          <div>
            <EventFilter />
            <div id="events-map">
              <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={{
                lat: userLat,
                lng: userLng}}
                defaultZoom={12}
                yesIWantToUseGoogleMapApiInternals
              >
              {eventItems}
              {showEventDetail ?
                <PickUpEventDetails
                  updateUsers={this.updateUsers}
                  removeUser={this.removeUser}
                  removeEvent={this.removeEvent}
                  toggleShowEventDetails={this.toggleShowEventDetails}
                  toggleShowEventEdit={this.toggleShowEventEdit}
                  {...eventForDetail} /> :
                null}
              {showEventEdit ?
                <EditPickUpEvent
                  userLat={userLat}
                  userLng={userLng}
                  toggleShowEventEdit={this.toggleShowEventEdit}
                  updateEvent={this.updateEvent}
                  {...eventForDetail} /> :
                null}
              </GoogleMapReact>
          </div>
        <div className="star-explanation">
          <img id="star-for-explanation" alt="owned-event" src={star} /> <span className="star-explanation">* Events you created</span>
        </div>
      </div> :
        <p>You must be logged in to access this content.</p>}
    </React.Fragment>
    )
  }
}

export default PickUpContainer
