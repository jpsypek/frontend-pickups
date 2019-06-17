import React from 'react'

const HomePage = (props) => {

  const {loggedIn} = props

  return(
    <div>
      <h3>Welcome to Sportster!</h3>
      <h4>The one place to go to view all of the pick-up sporting events that are going on near you!</h4>
      {loggedIn ?
        <p>In order to get started, please select from the menu above</p> :
        <p>In order to get started, please either log in or create an account above.</p>}
    </div>
  )
}

export default HomePage
