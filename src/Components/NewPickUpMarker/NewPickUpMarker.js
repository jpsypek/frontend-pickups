import React from 'react'

import spikeball from '../../markers/spikeball.png'
import soccer from '../../markers/soccer.png'
import basketball from '../../markers/basketball.png'
import kickball from '../../markers/kickball.png'
import defaultBall from '../../markers/default.png'

const NewPickUpMarker = (props) => {

  const iconHash = {
    "Spikeball": spikeball,
    "Soccer": soccer,
    "Basketball": basketball,
    "Kickball": kickball
  }

  return(
    <div className="marker">
      <img alt="event location" src={iconHash[props.sport] ? iconHash[props.sport] : defaultBall} />
    </div>
  )
}

export default NewPickUpMarker
