import React from 'react'
import './HomePage.css'

const HomePage = (props) => {

  return(
    <div>
      <h2 id="welcome-title">Welcome to Sportster!</h2>
      <h4>Your online resource to view all pick-up sports that are happening near you, no matter where you are!</h4>
      {localStorage.getItem('pickUpLogin') ?
        <p>In order to get started, please select from the menu above</p> :
        <p>In order to get started, please either log in or create an account above.</p>}
      <img src="../../public/cropped-time-out-sports-favicon.ico" alt="icon" />
    </div>
  )
}

export default HomePage
