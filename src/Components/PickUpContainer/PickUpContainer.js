import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import './PickUpContainer.css'
import PickUpEvent from '../PickUpEvent/PickUpEvent'
import EventFilter from '../EventFilter/EventFilter'
import PickUpEventDetails from '../PickUpEventDetails/PickUpEventDetails'

class PickUpContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      eventForDetail: {},
      showEventDetail: false
    }
  }

  static defaultProps = {
    center: { lat: 39.71, lng: -104.97 },
    zoom: 12
  }

  componentDidMount = () => {
    this.getEvents()
  }

  getEvents = () => {
    if (this.props.loggedIn) {
      fetch('http://localhost:3000/api/v1/events', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pickUpLogin")}`
        }
      })
        .then(response => response.json())
        .then(events => this.setState({ events }))
        .catch(error => console.error(error))
    }
  }

  updateUsers = (eventId, user) => {
    const { events } = this.state
    const eventToUpdate = events.find((event) => event.id === eventId)
    eventToUpdate.users.push(user)
    const unchangedEvents = events.filter((event) => event.id !== eventId)

    this.setState({
      events: [...unchangedEvents, eventToUpdate]
    })
    this.getEvents()
    this.toggleShowEventDetails({})
  }

  removeUser = (eventId, userId) => {
    const { events } = this.state
    const eventToUpdate = events.find((event) => event.id === eventId)
    const eventWithRemovedUser = eventToUpdate.users.filter((user) => user.id !== userId)

    this.setState({
      events: eventWithRemovedUser
    })
    this.getEvents()
    this.toggleShowEventDetails({})
  }

  toggleShowEventDetails = (event) => {
    this.setState({
      eventForDetail: event,
      showEventDetail: !this.state.showEventDetail
    })
  }

  render() {
    const { loggedIn } = this.props
    const { events, showEventDetail, eventForDetail } = this.state
    const API_KEY = `${process.env.REACT_APP_MAPS_API_KEY}`
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
    // for the first div you can prob. use a fragment 
    return (
      <div >
        {loggedIn ?
          <div>
            <EventFilter />
            <div id="events-map">
              <GoogleMap
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                yesIWantToUseGoogleMapApiInternals
              >
                {eventItems}
                {showEventDetail ?
                  <PickUpEventDetails updateUsers={this.updateUsers} removeUser={this.removeUser} {...eventForDetail}
                    toggleShowEventDetails={this.toggleShowEventDetails} /> :
                  null}
              </GoogleMap>
            </div>
          </div> :
          <p>You must log in to access this content</p>}
      </div>
    )
  }
}

export default PickUpContainer
