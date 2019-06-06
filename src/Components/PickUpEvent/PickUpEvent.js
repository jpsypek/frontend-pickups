import React, { Component } from 'react'
import './PickUpEvent.css'
import spikeball from '../../markers/spikeball.png'
import soccer from '../../markers/soccer.png'

class PickUpEvent extends Component {

  toggleDetailsShow = () => {
    const {toggleShowEventDetails, event} = this.props
    toggleShowEventDetails(event)
  }


  render () {
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
      </div>
    )
  }
}
export default PickUpEvent
