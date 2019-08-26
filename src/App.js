import React, { Component } from 'react'
import './App.css'
import logo from './sportster-icon.ico'
import UserLogin from './Components/UserLogin/UserLogin'
import NewUserForm from './Components/NewUserForm/NewUserForm'
import HomePage from './Components/HomePage/HomePage'
import PickUpContainerContainer from './js/containers/PickUpContainerContainer'
import NewPickUpFormContainer from './js/containers/NewPickUpFormContainer'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';


class App extends Component {
  constructor() {
    super()
    this.state = {
      showLogIn: false,
      showNewUserForm: false
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('pickUpLogin')) {
      this.logIn(
        localStorage.getItem('pickUpUser'),
        localStorage.getItem('pickUpLogin')
      )
    }
    navigator.geolocation.getCurrentPosition(this.onLocationSuccess, this.onLocationFailure)
  }

  onLocationSuccess = (position) => {
    this.props.addUserLat(position.coords.latitude)
    this.props.addUserLng(position.coords.longitude)
  }

  onLocationFailure = () => {
    this.props.addUserLat(39.756602)
    this.props.addUserLng(-105.006282)
  }

  logIn = (userId, token) => {
    // localStorage.setItem('pickUpUser', userId)
    // localStorage.setItem('pickUpLogin', token)
    this.props.addUserId(userId)
    this.setState({showLogIn: false})
  }

  logOut = () => {
    localStorage.clear()
    window.location.href = "https://sportster-frontend.herokuapp.com"
    this.props.removeUserId("")
    this.setState({showLogIn: false })
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
    const { showLogIn, showNewUserForm } = this.state

    return(
      <React.Fragment>
        <header>
          <img src={logo} alt="logo" className="header-logo" />
          <h1 className="app-name">Welcome to Sportster!</h1>
          {!localStorage.getItem('pickUpLogin') && !showLogIn ? (
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
                component={() => <HomePage />}
              />
              <Route
                path="/pickups"
                component={() => <PickUpContainerContainer />}
              />
              <Route
                path="/addpickup"
                component={() => <NewPickUpFormContainer />}
              />
            </div>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}

export default App
