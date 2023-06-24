import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.push('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state
    const userDetails = {email, password}
    const url = `https://stage.api.sloovi.com/login?product=outreach`
    const options = {
      method: 'POST',
      Headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    try {
      const response = await fetch(url, options)
      console.log(response)
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {email, password, showSubmitError, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/djbs4yqbz/image/upload/v1687527055/login_image_rafgqd.jpg"
          alt="login"
          className="login-image"
        />
        <div>
          <form className="form-container" onSubmit={this.submitForm}>
            <label className="input-label" htmlFor="email">
              Enter your Email:
            </label>
            <input
              onChange={this.onChangeEmail}
              className="email-input-field"
              type="email"
              value={email}
              id="email"
              placeholder="smithwills1989@gmail.com"
            />
            <label className="input-label" htmlFor="password">
              Enter your Password:
            </label>
            <input
              onChange={this.onChangePassword}
              className="password-input-field"
              type="password"
              placeholder="......"
              value={password}
              id="password"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
