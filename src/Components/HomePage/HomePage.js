import React from 'react'
import './HomePage.css'
import logo from '../../sportster-icon.ico'
const HomePage = (props) => {

  return(
    <div>
      <h2 id="welcome-title">Welcome to Sportster!</h2>
      <h4>Your online resource to view all pick-up sports that are happening near you, no matter where you are!</h4>
      {localStorage.getItem('pickUpLogin') ?
        <p>Select from the menu above to get started.</p> :
        <p>In order to get started, please either log in or create an account above.</p>}
      <img className="homepage-logo" src={logo} alt="icon" />
    </div>
  )
}

export default HomePage
