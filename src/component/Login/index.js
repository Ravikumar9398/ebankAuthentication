import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userInput: '',
    pinInput: '',
    errorMsg: '',
    isShow: false,
  }

  onChangePin = event => {
    this.setState({
      pinInput: event.target.value,
    })
  }

  onChangeInput = event => {
    this.setState({
      userInput: event.target.value,
    })
  }

  renderSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  renderFailure = errorMsg => {
    this.setState({
      isShow: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    console.log('ok')
    const {userInput, pinInput} = this.state
    const userData = {user_id: userInput, pin: pinInput}
    const loginApiUrl = ' https://apis.ccbp.in/ebank/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userData),
    }

    const response = await fetch(loginApiUrl, option)
    const data = await response.json()
    if (response.ok === true) {
      this.renderSuccess(data.Jwt_token)
    } else {
      this.renderFailure(data.error_msg)
    }
  }

  render() {
    const {isShow, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-bg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
            alt="website login"
            className="website-login"
          />
          <div className="side-bg">
            <h1 className="heading">Welcome Back!</h1>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <label htmlFor="user-id" className="label">
                User ID
              </label>
              <input
                type="text"
                placeholder="Enter User ID"
                id="user-id"
                className="input"
                onChange={this.onChangeInput}
              />
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                type="password"
                placeholder="Enter Pin"
                id="pin"
                className="input"
                onChange={this.onChangePin}
              />
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
            {isShow ? <p className="error-msg">*{errorMsg}</p> : ' '}
          </div>
        </div>
      </div>
    )
  }
}

export default Login
