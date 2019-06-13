import React, { Component } from 'react'
import './UserLogin.css'
import { postLoginFetch } from '../../utility/fetch'

class UserLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      notFound: false
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { password, email } = this.state
    postLoginFetch(email, password)
      .then(response => response.json())
      .then(data => this.handleLogIn(data))
      .catch(error => console.error(error))
  }

    handleLogIn = (data) => {
      if (data.user) {
        this.props.logIn(data.user.id, data.jwt)
      } else {
        this.setState({
          email: "",
          password: "",
          notFound: true
        })
      }
    }

  render() {
    const { notFound, email, password } = this.state

    return (
      <div>
        <div className="user-search">
          <div id="form">
            <form className="user-login-form" onSubmit={this.handleSubmit}>
              <input
                id="email-login"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={this.handleChange}
              />
              <input
                id="password-login"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={this.handleChange}
              />
            <button className="login-button button" type="submit">Log In</button>
            </form>
            <button onClick={this.props.toggleShowNewUserForm} id="create-user-button" className="button">
              Create Account
            </button>
          </div>
          {notFound ?
            <p id="error">The entered email or password were incorrect. Please try again.</p>
            : null}
        </div>
      </div>
    )
  }
}

export default UserLogin
