import React, { Component } from 'react'
import './PickUpEvent.css'
import spikeball from '../../markers/spikeball.png'
import soccer from '../../markers/soccer.png'

// can be a functional component
class PickUpEvent extends Component {

  toggleDetailsShow = () => {
    const { toggleShowEventDetails, event } = this.props
    toggleShowEventDetails(event)
  }

  iconHash = {
    "Spikeball": spikeball,
    "Soccer": soccer,
  }

  render() {
    // could be a hash table for better perfomance
    // this at best is O(1) at most cases its O(n)
    // a hash is always constant O(1)
    const icon = () => {
      switch (this.props.event.sport) {
        case "Spikeball":
          return spikeball
        case "Soccer":
          return soccer
        default:
          return soccer
      }
    }

    return (
      <div className="marker" onClick={this.toggleDetailsShow}>
        <img alt="event location" src={icon()} />
        <img alt="event location" src={this.iconHash[this.props.event.sport] ? this.iconHash[this.props.event.sport] : soccer} />
      </div>
    )
  }
}

export default PickUpEvent
