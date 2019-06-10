import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import NewPickUpMarker from '../NewPickUpMarker/NewPickUpMarker'
import './EditPickUpEvent.css'

class EditPickUpEvent extends Component {
  constructor(props) {
    super(props)
    const {sport, time, skill_level, latitude, longitude, id} = this.props
    this.state = {sport, time, skill_level, latitude, longitude, id}
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

    const {sport, time, skill_level, latitude, longitude} = this.state
    const API_KEY = `${process.env.REACT_APP_MAPS_API_KEY}`

    return(
      <div ref="modal" className="event-modal">
        <div className="event-modal-main">
          <form className="new-pickup-form" onSubmit={this.handleSubmit}>
            <label>Pick Up Date</label>
              <input name="time" value={time} onChange={this.handleChange} />
            <label>Sport</label>
              <select name="sport" value={sport} onChange={this.handleChange}>
                <option>Soccer</option>
                <option>Spikeball</option>
                <option>Basketball</option>
                <option>Kickball</option>
              </select>
            <label>Pick Up Time</label>
              <input name="time" value={time} onChange={this.handleChange} />
            <label>Skill Level</label>
              <select name="skill_level" value={skill_level} onChange={this.handleChange}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            <div>
              <label>Please select the exact location on the map below:</label>
                <div id="edit-event-map">
                  <GoogleMapReact
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
                  </GoogleMapReact>
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
