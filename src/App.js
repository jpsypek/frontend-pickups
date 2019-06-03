import React, { Component } from 'react'
import './App.css'
import UserLogin from './Components/UserLogin/UserLogin'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      showLogIn: false,
      userId: ""
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('pickUpLogin')) {
      this.logIn(localStorage.getItem('pickUpUser'))
    }
  }

  logIn = (userId) => {
    this.setState({userId})
    this.setState({loggedIn: !this.state.loggedIn})
  }

  logOut = () => {
    localStorage.clear()
    this.setState({
      loggedIn: false,
      userId: ""
    })
  }

  toggleShowLogIn = () => {
    this.setState({showLogIn: !this.state.showLogIn})
  }

  render() {
    const {loggedIn, showLogIn} = this.state

    return (
      <div>
        <header>
          {showLogIn ?
            <button onClick={this.toggleShowLogIn}>Log In</button> :
            <UserLogin logIn={this.logIn}/>}
        </header>
        {loggedIn ? <h1>You're logged in!</h1> : <h1>Log in first!</h1>}
        <button className="button log-out" onClick={this.logOut}>Log Out</button>
      </div>
    )
  }
}

export default App;
