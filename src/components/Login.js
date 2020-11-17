import React, { useState, useEffect } from 'react';
import { API } from '../APIService';
import { useCookies } from 'react-cookie'
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('')
  const [userID, setUserId] = useState(null)
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState(null)
  const [go, setGo] = useState(null)


  const [token, setToken] = useCookies(['psa-token']);
  const [ResponseUsername, setResponseUsername] = useCookies(['psa-name']);
  const [ResponseID, setResponseID] = useCookies(['psa-id']);

  useEffect(() => {
    if (token['psa-token']) window.location.href = '/verify-name';
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
    // if (!full_name) return setError("Please Provide Full Name")
    // if (!full_name.includes(" ")) return setError("Please Provide Full Name")
    console.log((!full_name.includes(" ")))
    API.register({ username: username, password: password })
      .then((response) => {
        if (response.data.message === "User Created") {
          // login()
          console.log(response.data)
          setUserId(response.data.user.id)
          login()
          // setTimeout(postName(), 5000)
          // postName()
        } else {
          console.log(response.data.message)
          setError(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // console.log(userID)
  // console.log(full_name)




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