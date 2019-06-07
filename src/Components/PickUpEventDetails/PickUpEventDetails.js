import React, { Component } from 'react'
import './PickUpEventDetails.css'
import star from '../../markers/star.png'

class PickUpEventDetails extends Component {

  addUserToEvent = () => {
    const {id} = this.props
    fetch('http://localhost:3000/api/v1/user_events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_event: {
          user_id: localStorage.getItem("pickUpUser"),
		      event_id: id
        }
      })
    })
    .then(response => response.json())
	  .then(data => this.props.updateUsers(id, data.user))
    .catch(error => console.error(error))
  }

  removeUserFromEvent = () => {
    const {id, user_events} = this.props
    const user_event = user_events.find((user_event) => {
      return user_event.user_id === parseInt(localStorage.getItem("pickUpUser"))})
    fetch(`http://localhost:3000/api/v1/user_events/${user_event.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem("pickUpLogin")}`
      },
      body: JSON.stringify({id: user_event.id})
    })
    .then(() => this.props.removeUser(id, parseInt(localStorage.getItem("pickUpUser"))))
    .catch(error => console.error(error))
  }

  deleteEvent = () => {
    const {id} = this.props
    fetch(`http://localhost:3000/api/v1/events/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem("pickUpLogin")}`
      },
      body: JSON.stringify({id})
    })
    .then(() => this.props.removeEvent(id))
    .catch(error => console.error(error))
  }

  closeDetailsBox = () => {
    this.props.toggleShowEventDetails({})
  }

  render() {

    const {sport, skill_level, location, users, owner, toggleShowEventEdit} = this.props
    const day = new Date(this.props.date).getDate()
    const currentUser = parseInt(localStorage.getItem("pickUpUser"))

    return(
      <div className="event-modal">
        <div className="event-modal-main">
          {owner === currentUser ? <img className="created-star"src={star} alt="owned-event"/> : null}
          <p>Sport: {sport}</p>
          <p>Time: {this.props.time}</p>
          <p>Day: {day}</p>
          <p>Skill Level: {skill_level}</p>
          <p>Location: {location}</p>
          <p>Number of people attending: {users.length}</p>
          <div>
            {users.find((user) => user.id === parseInt(localStorage.getItem("pickUpUser"))) ?
              <div>
                <p>You are going!</p>
                <button className="button modal-button" onClick={this.removeUserFromEvent}>Can no longer make it!</button>
              </div>:
              <button className="button modal-button" onClick={this.addUserToEvent}>I'm Going!</button>}
            {owner === currentUser ?
              <div>
                <button className="button modal-button" onClick={this.deleteEvent}>Delete Event</button>
                <button className="button modal-button" onClick={toggleShowEventEdit}>Edit Event</button>
              </div> :
              null}
          </div>
          <button className="button modal-button" onClick={this.closeDetailsBox}>Close</button>
        </div>
      </div>
    )
  }
}

export default PickUpEventDetails
