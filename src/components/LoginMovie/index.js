import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './index.css'

class LoginMovie extends Component {
  state = {
    password: '',
    username: '',
    error: false,
    errMsg: '',
    pwSeen: false,
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onsubmitSuccess = jwtToken => {
    // console.log(jwtToken)
    const {history} = this.props
    const {username, password} = this.state
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFail = err => {
    this.setState({error: true, errMsg: err})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    // console.log(response)
    if (response.ok === true) {
      this.onsubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFail(data.error_msg)
    }
  }

  onClickSeen = () => {
    this.setState(prevState => ({pwSeen: !prevState.pwSeen}))
  }

  render() {
    const {username, password, error, errMsg, pwSeen} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <img
          src="https://res.cloudinary.com/dno62jfce/image/upload/v1677301167/Group_7399pro_title_dfoapz.png"
          alt="login website logo"
          className="movie-logo"
        />
        <form className="login-form" onSubmit={this.submitForm}>
          <h1 className="login-heading">Login</h1>
          <div className="input-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input-el"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <div className="password-container">
              <input
                type="password"
                id="password"
                value={password}
                className="input-el-2"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
              <button
                className="password-seen"
                type="button"
                onClick={this.onClickSeen}
              >
                {pwSeen ? (
                  <AiFillEye className="eye" />
                ) : (
                  <AiFillEyeInvisible className="eye" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="error-msg">*{errMsg}</p>}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default LoginMovie
