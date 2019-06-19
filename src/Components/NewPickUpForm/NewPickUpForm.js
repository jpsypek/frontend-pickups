import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import './NewPickUpForm.css'
import NewPickUpMarker from '../NewPickUpMarker/NewPickUpMarker'
import screenshot from '../../screenshot-create.png'
import { postEventFetch, postUserEventFetch } from '../../utility/fetch'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/dark.css'

class NewPickUpForm extends Component {
  constructor(props) {
    super(props)
    const owner = parseInt(props.userId)
    this.state = {
      sport: "",
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

  handleCalendarChange = (event) => {
    const utcDate = new Date(event).toUTCString()
    this.setState({time: utcDate})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    postEventFetch(this.state)
      .then(response => response.json())
      .then(eventId => this.createRelationship(eventId))
      .catch(error => (console.error(error)))
  }

  createRelationship = (eventId) => {
    postUserEventFetch(eventId)
      .then(response => response.json())
      .catch(error => console.error(error))
    window.location.href = "http://localhost:3001/pickups"
  }

  render() {
    const { sport, time, skill_level, latitude, longitude } = this.state
    const { userLat, userLng } = this.props
    const API_KEY = process.env.REACT_APP_MAPS_API_KEY

    return (
      <React.Fragment>
        {localStorage.getItem('pickUpLogin') ?
          <div>
            <form className="new-pickup-form" onSubmit={this.handleSubmit}>
                <select className="new-dropdown" name="sport" value={sport} onChange={this.handleChange}>
                  <option hidden={true}>Choose Sport</option>
                  <option disabled="disabled">Choose Sport</option>
                  <option>Soccer</option>
                  <option>Spikeball</option>
                  <option>Basketball</option>
                  <option>Kickball</option>
                </select>
                <Flatpickr
                  data-enable-time
                  value={time}
                  options={{
                    dateFormat: "n/j/y h:i K",
                    minDate: Date.now()
                  }}
                  onChange={this.handleCalendarChange}
                  placeholder="Pick-up's date"/>
                  <select className="new-dropdown" name="skill_level" value={skill_level} onChange={this.handleChange}>
                    <option hidden={true}>Choose Skill Level</option>
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
                <button className="button" type="submit">Add Event</button>
            </form>
          </div> :
          <div>
            <p>This page allows you to create a new pick-up game, which will be broadcast to all users:</p>
            <img className="create-screenshot" src={screenshot} alt="screenshot" />
            <p>To gain access to this page, please either log in or create an account above.</p>
          </div>}
      </React.Fragment>
    )
  }
}

export default NewPickUpForm
