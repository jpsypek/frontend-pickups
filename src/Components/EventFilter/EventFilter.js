import React, { Component } from 'react'
import './EventFilter.css'
import getDistance from 'geolib/es/getDistance';

class EventFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sport: "",
      skill_level: "",
      attending: false,
      distance: false
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

  handleClick = () => {
    this.setState({attending: !this.state.attending}, () => {
      this.eventsToBeFiltered()
    })
  }

  eventsToBeFiltered = () => {
    const { attending, distance } = this.state
    if (attending && distance.length > 0) {
      const eventsOfUser = this.filterByAttending(this.props.events)
      const eventsWithinDistance = this.filterByDistance(eventsOfUser)
      this.filterEventsByDropdowns(eventsWithinDistance)
    } else if (attending) {
      const eventsOfUser = this.filterByAttending(this.props.events)
      this.filterEventsByDropdowns(eventsOfUser)
    } else if (distance.length > 0) {
      const eventsWithinDistance = this.filterByDistance(this.props.events)
      this.filterEventsByDropdowns(eventsWithinDistance)
    } else {
      this.filterEventsByDropdowns(this.props.events)
    }
  }

  filterByAttending = (events) => {
    return events.filter((event) => {
      return event.users.map(user => user.id).includes(parseInt(localStorage.getItem('pickUpUser')))
    })
  }

  filterByDistance = (events) => {
    const { userLng, userLat } = this.props
    const distanceInMeters = parseInt(this.state.distance) * 1609.34
    return events.filter((event) => {
      return getDistance(
        {latitude: event.latitude, longitude: event.longitude},
        {latitude: userLat, longitude: userLng}
      ) < distanceInMeters
    })
  }

  filterEventsByDropdowns = (eventsToFilter) => {
    const { sport, skill_level } = this.state
    const filteredEvents = eventsToFilter.filter((event) => {
      return event.sport.includes(sport) && event.skill_level.includes(skill_level)
    })
    this.props.filterEvents(filteredEvents)
  }

  clearFilter = (event) => {
    event.preventDefault()
    this.setState({
      sport: "",
      skill_level: "",
      distance: false,
      attending: false
    })
    this.props.filterEvents(this.props.events)
  }

  render() {
    const { sport, skill_level, attending, distance } = this.state
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
        <label className="filter-input attending-label">Events you're attending? </label>
        <input className="filter-input" name="attending" checked={attending ? "checked" : null} type="checkbox" onChange={this.handleClick} />
        <button className="button" id="clear-button" onClick={this.clearFilter}>Clear Filter</button>
      </form>
    )
  }
}

export default EventFilter
