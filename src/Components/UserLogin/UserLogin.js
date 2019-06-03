import React, { Component } from 'react'
import NewUserForm from '../NewUserForm/NewUserForm'

class UserLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputEmail: "",
      inputPassword: "",
      notFound: false,
      showNewUserForm: false
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {inputPassword, inputEmail} = this.state
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: inputEmail,
          password: inputPassword
        }
      })
    })
      .then(response => response.json())
      .then(data => this.handleLogIn(data))
      .catch(error => console.error(error))
    }

    handleLogIn = (data) => {
      const {logIn} = this.props
      if (data.user) {
        localStorage.setItem('pickUpUser', data.user.id)
        localStorage.setItem('pickUpLogin', data.jwt)
        logIn(data.user.id)
      } else {
        this.setState({
          inputEmail: "",
          inputPassword: "",
          notFound: true
        })
      }
    }


    toggleShowNewUserForm = () => {
      this.setState({showNewUserForm: !this.state.showNewUserForm})
    }

  render() {
    const {notFound, showNewUserForm, inputEmail, inputPassword} = this.state

    return (
      <div>
        <div className="user-search">
          <p className="instructions">To get started, please log in or create an account below!</p>
          <div id="form">
            <form onSubmit={this.handleSubmit}>
              <input name="inputEmail" placeholder="Enter your name" value={inputEmail} onChange={this.handleChange} />
              <input type="password" name="inputPassword" placeholder="Enter your password" value={inputPassword} onChange={this.handleChange} />
              <button className="button" type="submit">Log In</button>
            </form>
          </div>
          { notFound ? <p id="error">The entered email or password were incorrect. Please try again.</p> : null}
        </div>
        <div className="add-user">
          <button onClick={this.toggleShowNewUserForm} className="create-act button">Create Account</button>
          <NewUserForm showNewUserForm={showNewUserForm} toggleShowNewUserForm={this.toggleShowNewUserForm} handleLogIn={this.handleLogIn}/>
        </div>
      </div>
    )
  }
}

export default UserLogin
