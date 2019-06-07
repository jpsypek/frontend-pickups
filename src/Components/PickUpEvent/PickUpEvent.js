import React from 'react'
import './PickUpEvent.css'
import spikeball from '../../markers/spikeball.png'
import soccer from '../../markers/soccer.png'
import basketball from '../../markers/basketball.png'
import kickball from '../../markers/kickball.png'
import defaultBall from '../../markers/default.png'

const PickUpEvent = (props) => {

  const {toggleShowEventDetails, event} = props
  
  const icon = () => {
    switch (event.sport) {
      case "Spikeball":
        return spikeball
      case "Soccer":
        return soccer
      case "Basketball":
        return basketball
      case "Kickball":
        return kickball
      default:
        return defaultBall
    }
  }

  return(
    <div className="marker" onClick={() => toggleShowEventDetails(event)}>
      <img alt="event location" src={icon()} />
    </div>
  )
}

export default PickUpEvent
