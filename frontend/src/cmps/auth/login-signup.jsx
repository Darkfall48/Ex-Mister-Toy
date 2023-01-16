//? Libraries
import { useState } from 'react'
//? Services
import { userService } from '../../services/user.service.js'
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../services/event-bus.service.js'
//? Components
import { LoginForm } from './login-form.jsx'

export function LoginSignup({ onChangeLoginStatus }) {
  const [isSignup, setIsSignUp] = useState(false)

  function onLogin(credentials) {
    isSignup ? signup(credentials) : login(credentials)
  }

  async function login(credentials) {
    try {
      await userService.login(credentials)
      onChangeLoginStatus()
      showSuccessMsg('Logged in successfully')
    } catch (err) {
      showErrorMsg('Oops try again', err)
    }
  }

  async function signup(credentials) {
    try {
      await userService.signup(credentials)
      onChangeLoginStatus()
      showSuccessMsg('Signed in successfully')
    } catch (err) {
      showErrorMsg('Oops try again')
    }
  }

  return (
    <div className="login-page">
      <LoginForm onLogin={onLogin} isSignup={isSignup} />
      <div className="btns">
        <a href="#" onClick={() => setIsSignUp(!isSignup)}>
          {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
    </div>
  )
}
