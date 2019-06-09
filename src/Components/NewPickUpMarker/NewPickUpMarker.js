import React from 'react'

import spikeball from '../../markers/spikeball.png'
import soccer from '../../markers/soccer.png'
import basketball from '../../markers/basketball.png'
import kickball from '../../markers/kickball.png'

const NewPickUpMarker = (props) => {

  // Same here you could make a hash for O(1) time complexity
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
        return soccer
    }
  }

  return (
    <div className="marker" >
      <img alt="event location" src={icon()} />
    </div>
  )
}

export default NewPickUpMarker
