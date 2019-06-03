import React, { Component } from 'react'
import NewUserForm from '../NewUserForm/NewUserForm'
import './UserLogin.css'

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
        logIn(data.user.id, data.jwt)
      } else {
        this.setState({
          inputEmail: "",
          inputPassword: "",
          notFound: true
        })
      }
    }

  render() {
    const {notFound, showNewUserForm, inputEmail, inputPassword} = this.state

    return (
      <div>
        <div className="user-search">
          <div id="form">
            <form className="user-login-form" onSubmit={this.handleSubmit}>
              <input name="inputEmail" placeholder="Enter your email" value={inputEmail} onChange={this.handleChange} />
              <input type="password" name="inputPassword" placeholder="Enter your password" value={inputPassword} onChange={this.handleChange} />
              <button className="button" type="submit">Log In</button>
            </form>
          </div>
          { notFound ? <p id="error">The entered email or password were incorrect. Please try again.</p> : null}
        </div>
      </div>
    )
  }
}

export default UserLogin
