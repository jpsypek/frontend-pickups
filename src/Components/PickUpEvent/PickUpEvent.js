import React from 'react'
import './PickUpEvent.css'
import spikeball from '../../markers/spikeball.png'
import soccer from '../../markers/soccer.png'
import basketball from '../../markers/basketball.png'
import kickball from '../../markers/kickball.png'
import defaultBall from '../../markers/default.png'

const PickUpEvent = (props) => {

  const { displayEventDetails, event } = props

  const iconHash = {
    "Spikeball": spikeball,
    "Soccer": soccer,
    "Basketball": basketball,
    "Kickball": kickball
  }

  return(
    <div className="marker" onClick={() => displayEventDetails(event)}>
      <img alt="event location" src={iconHash[event.sport] ? iconHash[event.sport] : defaultBall} />
    </div>
  )
}

export default PickUpEvent
