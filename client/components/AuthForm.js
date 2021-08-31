import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {authenticate} from '../store'

const AuthForm = (props) => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)

  const { login } = props
  let name
  let displayName
  login ? name = 'login' : name = 'signup'
  login ? displayName = 'Log In': displayName = 'Sign Up'

  const handleSubmit = (event) => {
    event.preventDefault()
    const formName = event.target.name
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(authenticate(username, password, formName))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

export const Login = () => <AuthForm login />
export const Signup = () => <AuthForm />
