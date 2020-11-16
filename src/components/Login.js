import React, { useState, useEffect } from 'react';
import { API } from '../APIService';
import { useCookies } from 'react-cookie'
import { faEraser } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState(null)

  const [token, setToken] = useCookies(['psa-token']);
  const [ResponseUsername, setResponseUsername] = useCookies(['psa-name']);
  const [ResponseID, setResponseID] = useCookies(['psa-id']);

  useEffect(() => {
    if (token['psa-token']) window.location.href = '/schedule';
  }, [token])

  const login = (event) => {
    console.log("Login")
    API.login({ username: username, password: password })
      .then((response) => {
        console.log(response.data)
        if (response.data.message === "LOGGED_IN") {
          setToken('psa-token', response.data.token)
          setResponseUsername('psa-name', response.data.user.username)
          setResponseID('psa-id', response.data.user.id)
        }
        else {
          console.log(response.data.message)
          setError(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const register = (event) => {
    console.log("Register")
    API.register({ username: username, password: password })
      .then((response) => {
        if (response.data.message === "User Created") {
          login()
        } else {
          console.log(response.data.message)
          setError(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const isDisabled = username.length === 0 || password.length === 0;

  return (
    <div className="App">
      <header className="App-header">
        {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
      </header>
      <div className="login-container">
        <label htmlFor="username">Username</label><br />
        <input id="username" type="text" placeholder="username" value={username}
          onChange={evt => setUsername(evt.target.value)}
        /><br />
        <label htmlFor="password">Password</label><br />
        <input id="password" type="password" placeholder="password" value={password}
          onChange={evt => setPassword(evt.target.value)} /><br />
        {isLoginView ?
          <button onClick={login} disabled={isDisabled}>Login</button> :
          <button onClick={register} disabled={isDisabled}>Register</button>
        }
        {isLoginView ?
          <p onClick={() => setIsLoginView(false)}>You don't have an account? Register here!</p> :
          <p onClick={() => setIsLoginView(true)}>You already have an account? Login here</p>
        }
        {error ? <h4 className='error'>{error}</h4> : null}
      </div>
    </div>
  )
}

export default Login