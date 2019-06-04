import React from 'react'
import ApiConfig from '../../google_api'

const PickUpContainer = (props) => {

  const {loggedIn} = props
  const API_KEY = `${process.env.REACT_APP_MAPS_API_KEY}`
  return(
    <div>
      {loggedIn ? <p>{API_KEY}</p> : <p>You must be logged in to access this portion of the site.</p>}
    </div>
  )
}

export default PickUpContainer
