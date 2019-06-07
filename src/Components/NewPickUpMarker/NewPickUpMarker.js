import React from 'react'

import spikeball from '../../markers/spikeball.png'
import soccer from '../../markers/soccer.png'
import basketball from '../../markers/basketball.png'
import kickball from '../../markers/kickball.png'
import defaultBall from '../../markers/default.png'

const NewPickUpMarker = (props) => {

  const icon = () => {
    switch (props.sport) {
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

  return (
    <div className="marker" >
      <img alt="event location" src={icon()} />
    </div>
  )
}
export default NewPickUpMarker
