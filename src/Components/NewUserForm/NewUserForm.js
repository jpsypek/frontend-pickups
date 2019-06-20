import React, { Component } from 'react'
import { postUserFetch } from '../../utility/fetch'

class NewUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      bio: "",
      showError: false
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
    const { email, password, first_name, last_name, bio } = this.state
    postUserFetch(email, password, first_name, last_name, bio)
      .then(response => response.json())
      .then(data => this.newUserEvent(data))
      .catch(error => console.error(error))
  }

  newUserEvent = (data) => {
    const { toggleShowNewUserForm, logIn } = this.props
    if (data.user) {
      toggleShowNewUserForm()
      logIn(data.user.id, data.jwt)
    } else {
      this.setState({
        email: "",
        password: "",
        showError: true
      })
    }
  }

  render() {
    const { showNewUserForm, toggleShowNewUserForm } = this.props
    const { email, password, first_name, last_name, bio, showError } = this.state

    return(
      <React.Fragment>
        {showNewUserForm ?
          <div className="modal">
            <div className="modal-main">
              <form onSubmit={this.handleSubmit}>
                <label className="modal-label">First Name:</label>
                <input className="modal-input" name="first_name" onChange={this.handleChange} value={first_name} />
                <label className="modal-label">Last Name:</label>
                <input className="modal-input" name="last_name" onChange={this.handleChange} value={last_name} />
                <label className="modal-label">Bio:</label>
                <textarea className="modal-input" name="bio" onChange={this.handleChange} value={bio} />
                <label className="modal-label">Email:</label>
                <input className="modal-input" name="email" onChange={this.handleChange} value={email} />
                <label className="modal-label">Password:</label>
                <input className="modal-input" type="password" name="password" onChange={this.handleChange} value={password} />
                <button className="button modal-button" type="submit">Create Account</button>
              </form>
              {showError ? <p>Invalid username, please try again.</p> : null}
              <button className="button modal-button" onClick={toggleShowNewUserForm}>Close</button>
            </div>
          </div> :
        null}
      </React.Fragment>
    )
  }
}

export default NewUserForm
