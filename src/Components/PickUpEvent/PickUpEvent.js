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
    this.setState({
      users: [...this.state.users, user]
    })
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
          <PickUpEventDetails {...this.state} updateUsers={this.updateUsers} toggleDetailsShow={this.toggleDetailsShow}/> :
          null}
      </div>
    )
  }
}
export default PickUpEvent
