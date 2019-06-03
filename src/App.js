import React, { Component } from 'react'
import './App.css'
import UserLogin from './Components/UserLogin/UserLogin'
import NewUserForm from './Components/NewUserForm/NewUserForm'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      showLogIn: false,
      showNewUserForm: false,
      userId: ""
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('pickUpLogin')) {
      this.logIn(localStorage.getItem('pickUpUser'))
    }
  }

  logIn = (userId, token) => {
    localStorage.setItem('pickUpUser', userId)
    localStorage.setItem('pickUpLogin', token)
    this.setState({
      userId,
      showLogIn: false,
      loggedIn: true})
  }

  logOut = () => {
    localStorage.clear()
    this.setState({
      loggedIn: false,
      userId: "",
      showLogIn: false
    })
  }

  toggleShowLogIn = () => {
    this.setState({showLogIn: !this.state.showLogIn})
  }

  toggleShowNewUserForm = () => {
    this.setState({showNewUserForm: !this.state.showNewUserForm})
  }

  render() {
    const {loggedIn, showLogIn, showNewUserForm} = this.state

    return (
      <div>
        <header>
          <h1 className="app-name">Pick Up Sports!</h1>
          {loggedIn ?
            <button className="button log-out user-credentials" onClick={this.logOut}>Log Out</button> :
            <div className="user-credentials">
              <button onClick={this.toggleShowLogIn}>Log In</button>
              <button onClick={this.toggleShowNewUserForm} className="create-act button">Create Account</button>
              <NewUserForm showNewUserForm={showNewUserForm} toggleShowNewUserForm={this.toggleShowNewUserForm} handleLogIn={this.handleLogIn}/>
            </div>}
          {showLogIn ? <UserLogin logIn={this.logIn} /> : null}
        </header>
        {loggedIn ? <p>You're logged in!</p> : <p>Log in first!</p>}
      </div>
    )
  }
}

export default App;
