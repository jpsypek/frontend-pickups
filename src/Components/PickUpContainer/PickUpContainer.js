import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import './PickUpContainer.css'
import PickUpEvent from '../PickUpEvent/PickUpEvent'
import EventFilter from '../EventFilter/EventFilter'

class PickUpContainer extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
    }
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
        .then(events => this.setState({events}))
        .catch(error=>console.error(error))
    }
  }

  render () {
    const {loggedIn} = this.props
    const {events} = this.state
    const API_KEY = `${process.env.REACT_APP_MAPS_API_KEY}`
    const eventItems = events.map((event) => {
      return <PickUpEvent key={event.id + Date.now()} lat={event.latitude} getEvents={this.getEvents}
        lng={event.longitude} updateLatLng={this.updateLatLng} {...event} />
    })

    return(
      <div >
        {loggedIn ?
          <div>
            <EventFilter />
            <div id="events-map">
              <GoogleMapReact
                  bootstrapURLKeys={{ key: API_KEY }}
                  defaultCenter={{
                    lat: 39.71,
                    lng: -104.97
                  }}
                  defaultZoom={12.5}
                  yesIWantToUseGoogleMapApiInternals
              >
              {eventItems}
          </GoogleMapReact>
        </div>
        </div>:
        <p>You must log in to access this content</p>}
    </div>
    )
  }
}

export default PickUpContainer
