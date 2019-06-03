import React from 'react'

const PickUpContainer = (props) => {

  const {loggedIn} = props

  return(
    <div>
      {loggedIn ? <p>Coming Soon!</p> : <p>You must be logged in to access this portion of the site.</p>}
    </div>
  )
}

export default PickUpContainer
