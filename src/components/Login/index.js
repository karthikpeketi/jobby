import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onUpdateUsername = event => {
    this.setState({username: event.target.value})
  }

  onUpdatePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="label" htmlFor="username-label">
          USERNAME
        </label>
        <input
          type="text"
          onChange={this.onUpdateUsername}
          value={username}
          className="input-field"
          id="username-label"
          placeholder="Username"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="label" htmlFor="password-label">
          PASSWORD
        </label>
        <input
          type="password"
          onChange={this.onUpdatePassword}
          value={password}
          className="input-field"
          id="password-label"
          placeholder="Password"
        />
      </>
    )
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    console.log(showErrorMsg)
    console.log(errorMsg)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website-logo"
              className="website-logo"
            />
            <div className="each-input-container">
              {this.renderUsernameField()}
            </div>
            <div className="each-input-container">
              {this.renderPasswordField()}
            </div>
            <button className="submit-button" type="submit">
              Login
            </button>
            {showErrorMsg ? <p className="error-msg">{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
