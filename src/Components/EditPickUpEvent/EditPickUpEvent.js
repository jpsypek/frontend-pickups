import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import NewPickUpMarker from '../NewPickUpMarker/NewPickUpMarker'
import './EditPickUpEvent.css'

class EditPickUpEvent extends Component {
  constructor(props) {
    super(props)
    const {sport, time, date, skill_level, location, latitude, longitude, id} = this.props
    this.state = {sport, time, date, skill_level, location, latitude, longitude, id}
  }

  handleMapClick = (event) => {
    this.setState({
      latitude: event.lat,
      longitude: event.lng
    })
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/api/v1/events/${this.state.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("pickUpLogin")}`
        },
        body: JSON.stringify(this.state)
      })
      .then(() => this.props.updateEvent(this.state))
      .catch(error => console.error(error))
    }

  render() {
    const {sport, date, time, skill_level, location, latitude, longitude} = this.state
    const API_KEY = `${process.env.REACT_APP_MAPS_API_KEY}`

    return(
      <div ref="modal" className="event-modal">
        <div className="event-modal-main">
          <form className="new-pickup-form" onSubmit={this.handleSubmit}>
            <label>Pick Up Date</label>
              <input name="date" value={date} onChange={this.handleChange} />
            <label>Sport</label>
              <select name="sport" value={sport} onChange={this.handleChange}>
                  <option></option>
                  <option>Soccer</option>
                  <option>Spikeball</option>
                  <option>Basketball</option>
                  <option>Kickball</option>
                </select>
              <label>Pick Up Time</label>
                <input name="time" value={time} onChange={this.handleChange} />
              <label>Skill Level</label>
                <select name="skill_level" value={skill_level} onChange={this.handleChange}>
                    <option></option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
              <label>Location (specific park, gym, etc.)</label>
                <input name="location" value={location} onChange={this.handleChange} />
              <div>
              <label>Please select the exact location on the map below:</label>
              <div id="edit-event-map">
                <GoogleMap
                    onClick={this.handleMapClick}
                    bootstrapURLKeys={{ key: API_KEY }}
                    defaultCenter={{
                    lat: this.props.userLat,
                    lng: this.props.userLng}}
                    defaultZoom={12}
                    yesIWantToUseGoogleMapApiInternals
                >
                {latitude && longitude ?
                <NewPickUpMarker lat={latitude} lng={longitude} sport={sport} /> :
                null}
                </GoogleMap>
              </div>
              </div>
            <button type="submit">Edit Event</button>
          </form>
      </div>
      </div>
    )
  }
}

export default EditPickUpEvent
