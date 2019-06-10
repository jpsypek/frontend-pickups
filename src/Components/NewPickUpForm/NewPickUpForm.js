import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import './NewPickUpForm.css'
import NewPickUpMarker from '../NewPickUpMarker/NewPickUpMarker'
import flatpickr from 'flatpickr'

class NewPickUpForm extends Component {
  constructor(props) {
    super(props)
    const owner = parseInt(props.userId)
    this.state = {
      sport: "",
      date: "",
      time: "",
      skill_level: "",
      location: "",
      latitude: "",
      longitude: "",
      owner
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleMapClick = (event) => {
    this.setState({
      latitude: event.lat,
      longitude: event.lng
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/api/v1/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("pickUpLogin")}`
      },
      body: JSON.stringify(this.state)
    })
    .then(response => response.json())
    .then(eventId => this.createRelationship(eventId))
    .catch(error => (console.error(error)))
  }

  createRelationship = (eventId) => {
    fetch('http://localhost:3000/api/v1/user_events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_event: {
          user_id: localStorage.getItem("pickUpUser"),
          event_id: eventId
        }
      })
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    window.location.href = "http://localhost:3001/pickups"
  }

  render() {
    const { sport, date, time, skill_level, latitude, longitude } = this.state
    const { loggedIn, userLat, userLng } = this.props
    const API_KEY = process.env.REACT_APP_MAPS_API_KEY

    return (
      <React.Fragment>
        {loggedIn ?
          <div>
            <form className="new-pickup-form" onSubmit={this.handleSubmit}>
              <label>Pick Up Date</label>
              flatpickr("#myID")
              <label>Sport</label>
                <select name="sport" value={sport} onChange={this.handleChange}>
                  <option hidden="true">Choose Sport</option>
                  <option disabled="disabled">Choose Sport</option>
                  <option>Soccer</option>
                  <option>Spikeball</option>
                  <option>Basketball</option>
                  <option>Kickball</option>
                </select>
                <label>Pick Up Time</label>
                <input name="time" value={time} onChange={this.handleChange} />
                <label>Skill Level</label>
                  <select name="skill_level" value={skill_level} onChange={this.handleChange}>
                    <option hidden="true">Choose Skill Level</option>
                    <option disabled="disabled">Choose Skill Level</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                <div>
                  <label>Please select the exact location on the map below:</label>
                  <div id="new-event-map">
                    <GoogleMap
                      onClick={this.handleMapClick}
                      bootstrapURLKeys={{ key: API_KEY }}
                      defaultCenter={{
                      lat: userLat,
                      lng: userLng}}
                      defaultZoom={13}
                      yesIWantToUseGoogleMapApiInternals
                    >
                      {latitude && longitude ?
                        <NewPickUpMarker lat={latitude} lng={longitude} sport={sport} /> :
                        null}
                    </GoogleMap>
                  </div>
                </div>
                <button type="submit">Add Event</button>
            </form>
          </div> :
          <p>You must be logged in to access this content.</p>}
      </React.Fragment>
    )
  }
}

export default NewPickUpForm
