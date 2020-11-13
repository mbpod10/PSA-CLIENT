import './App.css';
import React, { useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Home from './components/Home';
import Schedule from "./components/Schedule"
import { useCookies } from 'react-cookie'



function App() {
  const [token, setToken] = useCookies(['psa-token']);
  const [ResponseUsername, setResponseUsername] = useCookies(['psa-name']);

  // useEffect(() => {
  //   if (!token['psa-token']) window.location.href = '/login'
  // }, [token])

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" render={(props) => (<Home {...props} />)} />
        <Route path="/login" render={(props) => (<Login {...props} />)} />
        <Route path="/schedule" render={(props) => (<Schedule {...props} />)} />
      </Switch>
    </div>
  );
}

export default App;
