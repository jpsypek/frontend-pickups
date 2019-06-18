import React, { Component } from 'react'
import './App.css'
import logo from './sportster-icon.ico'
import UserLogin from './Components/UserLogin/UserLogin'
import NewUserForm from './Components/NewUserForm/NewUserForm'
import HomePage from './Components/HomePage/HomePage'
import PickUpContainerContainer from './js/containers/PickUpContainerContainer'
import NewPickUpForm from './Components/NewPickUpForm/NewPickUpForm'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';


class App extends Component {
  constructor() {
    super()
    this.state = {
      showLogIn: false,
      showNewUserForm: false,
      userId: ""
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
      this.props.addUserLat(position.coords.latitude)
      this.props.addUserLng(position.coords.longitude)
    })
  }

  logIn = (userId, token) => {
    localStorage.setItem('pickUpUser', userId)
    localStorage.setItem('pickUpLogin', token)
    this.setState({userId, showLogIn: false})
  }

  logOut = () => {
    localStorage.clear()
    window.location.href = "http://localhost:3001/"
    this.setState({userId: "", showLogIn: false })
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

    const { showLogIn, showNewUserForm, userId } = this.state
    const { userLat, userLng } = this.props

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
                component={() => <NewPickUpForm
                  userLat={userLat}
                  userLng={userLng}
                  userId={userId}
                />}
              />
            </div>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   addUserLat: (userLat) => dispatch(addUserLat(userLat))
// })
//
// export default connect(
//   null,
//   mapDispatchToProps
// )(App)

export default App
