import React from 'react'
import ApiConfig from '../../google_api'

const PickUpContainer = (props) => {

  const {loggedIn} = props

  return(
    <div>
      {loggedIn ? <p>{ApiConfig.googleAPI}</p> : <p>You must be logged in to access this portion of the site.</p>}
    </div>
  )
}

export default PickUpContainer
