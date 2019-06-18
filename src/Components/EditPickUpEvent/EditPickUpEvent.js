import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import NewPickUpMarker from '../NewPickUpMarker/NewPickUpMarker'
import './EditPickUpEvent.css'
import { patchEventFetch } from '../../utility/fetch'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/dark.css'

class EditPickUpEvent extends Component {
  constructor(props) {
    super(props)
    const { sport, time, skill_level, latitude, longitude, id } = this.props
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

  handleCalendarChange = (event) => {
    const utcDate = new Date(event).toUTCString()
    this.setState({time: utcDate})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    patchEventFetch(this.state)
      .then(response => response.json())
      .then(data => this.props.updateEvent(data))
      .catch(error => console.error(error))
    }

  render() {
    const {sport, time, skill_level, latitude, longitude} = this.state
    const { toggleShowEventEdit } = this.props
    const API_KEY = `${process.env.REACT_APP_MAPS_API_KEY}`

    return(
      <div ref="modal" className="event-modal">
        <div className="event-modal-main">
          <form className="edit-pickup-form" onSubmit={this.handleSubmit}>
            <div className="edit-input">
              <label className="edit-label">Sport:</label>
                <select className="edit-dropdown" name="sport" value={sport} onChange={this.handleChange}>
                  <option>Soccer</option>
                  <option>Spikeball</option>
                  <option>Basketball</option>
                  <option>Kickball</option>
                </select>
            </div>
            <div className="edit-input">
            <label>Event time:</label>
              <Flatpickr
                className="edit-event-calendar edit-dropdown"
                data-enable-time
                value={time}
                options={{
                  dateFormat: "n/j/y h:i K",
                }}
                onChange={this.handleCalendarChange}/>
            </div>
            <div className="edit-input">
              <label>Skill Level:</label>
                <select className="edit-dropdown" name="skill_level" value={skill_level} onChange={this.handleChange}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
            </div>
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
            <button
              className="button modal-button"
              type="submit">
              Edit Event
            </button>
            <button
              className="button modal-button"
              onClick={toggleShowEventEdit}>
              Close
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default EditPickUpEvent
