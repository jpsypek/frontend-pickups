import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import UserLogin from './Components/UserLogin/UserLogin'
import NewUserForm from './Components/NewUserForm/NewUserForm'
import HomePage from './Components/HomePage/HomePage'
import PickUpContainer from './Components/PickUpContainer/PickUpContainer'
import NewPickUpForm from './Components/NewPickUpForm/NewPickUpForm'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      showLogIn: false,
      showNewUserForm: false,
      userId: "",
      userLat: "",
      userLng: ""
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('pickUpLogin')) {
      this.logIn(
        localStorage.getItem('pickUpUser'),
        localStorage.getItem('pickUpLogin')
      )
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        userLat: position.coords.latitude,
        userLng: position.coords.longitude
      })})
  }

  logIn = (userId, token) => {
    localStorage.setItem('pickUpUser', userId)
    localStorage.setItem('pickUpLogin', token)
    this.setState({ userId, showLogIn: false, loggedIn: true })
  }

  logOut = () => {
    localStorage.clear()
    window.location.href = "http://localhost:3001/"
    this.setState({ loggedIn: false, userId: "", showLogIn: false })
  }

  toggleShowLogIn = () => {
    this.setState({
      showLogIn: !this.state.showLogIn
    })
  }

  toggleShowNewUserForm = () => {
    this.setState({
      showNewUserForm: !this.state.showNewUserForm
    })
  }

  render() {

    const { loggedIn, showLogIn, showNewUserForm, userLat, userLng, userId } = this.state

    return(
      <React.Fragment>
        <header>
          <h1 className="app-name">Welcome to Sportster!</h1>
          {!loggedIn && !showLogIn ? (
            <div className="user-credentials">
              <button className="button" onClick={this.toggleShowLogIn}>Log In</button>
              <button
                onClick={this.toggleShowNewUserForm}
                className="create-act button"
                >
                Create Account
                </button>
                <NewUserForm
                  showNewUserForm={showNewUserForm}
                  toggleShowNewUserForm={this.toggleShowNewUserForm}
                  logIn={this.logIn}
                />
              </div>
            ) : (
              <button
                className="button log-out user-credentials"
                onClick={this.logOut}>
                Log Out
              </button>
            )}
          {showLogIn ?
            <div>
            <UserLogin toggleShowNewUserForm={this.toggleShowNewUserForm} logIn={this.logIn}/>
              <NewUserForm
                showNewUserForm={showNewUserForm}
                toggleShowNewUserForm={this.toggleShowNewUserForm}
                logIn={this.logIn}
              />
            </div>
            : null}
        </header>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <NavLink exact={true} to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink exact={true} to="/pickups">
                    All Pick Up Games
                  </NavLink>
                </li>
                <li>
                  <NavLink exact={true} to="/addpickup">
                    Create a New Pick Up Game
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="containers">
              <Route
                exact={true}
                path="/"
                component={() => <HomePage loggedIn={loggedIn}/>}
              />
              <Route
                path="/pickups"
                component={() => <PickUpContainer
                  userLat={userLat}
                  userLng={userLng}
                  loggedIn={loggedIn}
                />}
              />
              <Route
                path="/addpickup"
                component={() => <NewPickUpForm
                  userLat={userLat}
                  userLng={userLng}
                  userId={userId}
                  loggedIn={loggedIn}
                />}
              />
            </div>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}

export default App
