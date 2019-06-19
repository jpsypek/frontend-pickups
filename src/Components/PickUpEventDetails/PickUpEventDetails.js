import React, { Component } from 'react'
import './PickUpEventDetails.css'
import star from '../../markers/star.png'
import { postUserEventFetch, deleteUserEventFetch, deleteEventFetch } from '../../utility/fetch'
import dateFormat from 'dateformat'

class PickUpEventDetails extends Component {

  addUserToEvent = () => {
    const { id } = this.props.eventForDetail
    postUserEventFetch(id)
      .then(response => response.json())
  	  .then(data => this.props.updateUsers(data.event, data.user))
      .catch(error => console.error(error))
  }

  removeUserFromEvent = () => {
    const { id, user_events } = this.props.eventForDetail
    const userId = parseInt(localStorage.getItem("pickUpUser"))
    const user_event = user_events.find((user_event) => {
      return user_event.user_id === userId})
    deleteUserEventFetch(user_event.id)
      .then(() => this.props.removeUser(id, userId))
      .catch(error => console.error(error))
  }

  deleteEvent = () => {
    const { id } = this.props.eventForDetail
    deleteEventFetch(id)
      .then(() => this.props.removeEvent(id))
      .catch(error => console.error(error))
  }

  closeDetailsBox = () => {
    this.props.toggleShowEventDetails({})
  }

  render() {
    const { sport, skill_level, users, owner } = this.props.eventForDetail
    const { toggleShowEventEdit } = this.props
    const utcTime = new Date(this.props.eventForDetail.time)
    const time = dateFormat(utcTime, "h:MM TT")
    const date = dateFormat(utcTime, "dddd, mmmm dS")
    const currentUser = parseInt(localStorage.getItem("pickUpUser"))

    return(
      <div className="event-modal">
        <div className="event-modal-main">
          {owner === currentUser ? <img className="created-star"src={star} alt="owned-event"/> : null}
          <p>Sport: {sport}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          <p>Skill Level: {skill_level}</p>
          <p>{users.length === 1 ? "1 person" : `${users.length} people`}  attending!</p>
          <div>
            {users.find((user) => user.id === parseInt(localStorage.getItem("pickUpUser"))) ?
              <div>
                <p>You are going!</p>
                <button
                  className="button modal-button"
                  onClick={this.removeUserFromEvent}>
                  Can no longer make it!
                </button>
              </div> :
              <button
                className="button modal-button"
                onClick={this.addUserToEvent}>
                I'm Going!
              </button>
            }
            {owner === currentUser ?
              <div>
                <button
                  className="button modal-button"
                  onClick={this.deleteEvent}>
                  Delete Event
                </button>
                <button
                  className="button modal-button"
                  onClick={toggleShowEventEdit}>
                  Edit Event
                </button>
              </div> :
              null
            }
          </div>
          <button
            className="button modal-button"
            onClick={this.closeDetailsBox}>
            Close
          </button>
        </div>
      </div>
    )
  }
}

export default PickUpEventDetails
