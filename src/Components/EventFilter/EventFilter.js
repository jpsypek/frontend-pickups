import React, { Component } from 'react'
import './EventFilter.css'
import getDistance from 'geolib/es/getDistance'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/dark.css'
import dateFormat from 'dateformat'

class EventFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sport: "",
      skill_level: "",
      attending: false,
      date: "",
      distance: ""
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    }, () => {
      this.eventsToBeFiltered()
    })
  }

  handleCalendarChange = (event) => {
    const utcDate = new Date(event)
    this.setState({
      date: utcDate
    }, () => {
      this.eventsToBeFiltered()
    })
  }

  handleClick = () => {
    this.props.toggleFilteredAttending()
    this.setState({attending: !this.state.attending}, () => {
      this.eventsToBeFiltered()
    })
  }

  eventsToBeFiltered = () => {
    const { attending, distance, date, sport, skill_level } = this.state
    let filteredEvents = this.props.events
    if (attending) {
      filteredEvents = this.filterEventsByAttending(filteredEvents)
    }
    if (date !== "") {
      filteredEvents = this.filterEventsByDate(filteredEvents)
    }
    if (distance !== "") {
      filteredEvents = this.filterEventsByDistance(filteredEvents)
    }
    if (sport !== "") {
      filteredEvents = this.filterEventsBySportOrSkill(filteredEvents, "sport")
    }
    if (skill_level !== "") {
      filteredEvents = this.filterEventsBySportOrSkill(filteredEvents, "skill_level")
    }
    this.props.updateFilteredEvents(filteredEvents)
  }

  filterEventsByDate = (events) => {
    const filterDate = dateFormat(this.state.date, "dddd, mmmm dS")
    return events.filter((event) => {
      const eventFullTime = new Date(event.time)
      const eventDate = dateFormat(eventFullTime, "dddd, mmmm dS")
      return eventDate === filterDate
    })
  }

  filterEventsByAttending = (events) => {
    return events.filter((event) => {
      return event.users.map(user => user.id).includes(parseInt(localStorage.getItem('pickUpUser')))
    })
  }

  filterEventsByDistance = (events) => {
    const { userLng, userLat } = this.props
    const distanceInMeters = parseInt(this.state.distance) * 1609.34
    return events.filter((event) => {
      return getDistance(
        {latitude: event.latitude, longitude: event.longitude},
        {latitude: userLat, longitude: userLng}
      ) < distanceInMeters
    })
  }

  filterEventsBySportOrSkill = (events, attribute) => {
    return events.filter((event) => {
      return event[attribute].includes(this.state[attribute])
    })
  }

  clearFilter = (event) => {
    event.preventDefault()
    this.setState({
      sport: "",
      skill_level: "",
      distance: "",
      date: "",
      attending: false
    })
    this.props.updateFilteredEvents(this.props.events)
  }

  render() {
    const { sport, skill_level, attending, distance, date } = this.state
    return(
      <form id="event-filter-bar">
        <select className="filter-input filter-dropdown" name="sport" value={sport} onChange={this.handleChange}>
          <option hidden={true}>Any Sport</option>
          <option disabled="disabled">Any Sport</option>
          <option className="filter-dropdown">Soccer</option>
          <option>Spikeball</option>
          <option>Basketball</option>
          <option>Kickball</option>
        </select>
        <select className="filter-input filter-dropdown" name="distance" value={distance} onChange={this.handleChange}>
          <option hidden={true}>Within Any Distance</option>
          <option disabled="disabled">Within Any Distance</option>
          <option value="1">1 mile</option>
          <option value="3">3 miles</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
        </select>
        <select className="filter-input filter-dropdown" name="skill_level" value={skill_level} onChange={this.handleChange}>
          <option hidden={true}>Any Skill Level</option>
          <option disabled="disabled">Any Skill Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <Flatpickr
          className="filter-input"
          value={date}
          options={{
            enableTime: false,
            dateFormat: "n/j/y",
          }}
          onChange={this.handleCalendarChange}
          placeholder="Any day"/>
        <label className="filter-input attending-label">Events you're attending? </label>
        <input className="filter-input" name="attending" checked={attending} type="checkbox" onChange={this.handleClick} />
        <button className="button" id="clear-button" onClick={this.clearFilter}>Clear Filter</button>
      </form>
    )
  }
}

export default EventFilter
