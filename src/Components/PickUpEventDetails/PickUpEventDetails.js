import React, { Component } from 'react'
import './PickUpEventDetails.css'

class PickUpEventDetails extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  addUserToEvent = () => {
    const {id, user_events} = this.props
    const userId = parseInt(localStorage.getItem("pickUpUser"))
    const user_event = user_events.find((user_event) => user_event.user_id === userId)
    if (!user_event) {
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
  	  .then(data => this.props.updateUsers(data.user))
      .catch(error => console.error(error))
    }
  }

  removeUserFromEvent = () => {
    const {user_events} = this.props
    const userId = parseInt(localStorage.getItem("pickUpUser"))
    const user_event = user_events.find((user_event) => user_event.user_id === userId)
    if (user_event) {
    fetch(`http://localhost:3000/api/v1/user_events/${user_event.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem("pickUpLogin")}`
      },
      body: JSON.stringify({id: user_event.id})
      })
    .then(() => this.props.removeUser(parseInt(localStorage.getItem("pickUpUser"))))
    .catch(error => console.error(error))
    }
  }

  componentDidMount = () => {
    this.refs.modal.scrollIntoView(true)
  }

  render () {
    const {sport, skill_level, location, users} = this.props
    const day = new Date(this.props.date).getDate()

    return(
      <div ref="modal" className="event-modal">
        <div className="event-modal-main">
          <p>Sport: {sport}</p>
          <p>Time: {this.props.time}</p>
          <p>Day: {day}</p>
          <p>Skill Level: {skill_level}</p>
          <p>Location: {location}</p>
          <p></p>
          <div>
            {users.find((user) => user.id === parseInt(localStorage.getItem("pickUpUser"))) ?
            <div>
              <p>You are going!</p>
              <button className="button modal-button" onClick={this.removeUserFromEvent}>Can no longer make it!</button>
            </div>:
            <button className="button modal-button" onClick={this.addUserToEvent}>I'm Going!</button>
            }
          </div>
          <button className="button modal-button" onClick={this.props.toggleDetailsShow}>Close</button>
        </div>
      </div>
    )
  }
}
export default PickUpEventDetails
