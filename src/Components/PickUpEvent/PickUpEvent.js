import React, { Component } from 'react'
import './PickUpEvent.css'
import spikeball from '../../markers/spikeball.png'
import soccer from '../../markers/soccer.png'
import PickUpEventDetails from '../PickUpEventDetails/PickUpEventDetails'

class PickUpEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
      ...this.props
    }
  }

  toggleDetailsShow = () => {
    this.setState({showDetails: !this.state.showDetails})
  }

  updateUsers = (user) => {
    console.log(this.state.users)
    this.setState({
      users: [...this.state.users, user]
    })
    console.log(this.state.users)
    this.props.getEvents()
  }

  removeUser = (userId) => {
    const users = this.state.users.filter((user) => user.id !== userId)
    this.setState({users})
    this.props.getEvents()
  }

  render () {
    const icon = () => {
      switch (this.props.sport) {
        case "Spikeball":
          return spikeball
        case "Soccer":
          return soccer
        default:
          return soccer
      }
    }
    const {showDetails} = this.state
    return (
      <div className="marker" onClick={this.toggleDetailsShow}>
        <img alt="event location" src={icon()} />
        {showDetails ?
          <PickUpEventDetails {...this.state} updateUsers={this.updateUsers} removeUser={this.removeUser} toggleDetailsShow={this.toggleDetailsShow}/> :
          null}
      </div>
    )
  }
}
export default PickUpEvent
