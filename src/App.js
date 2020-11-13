import './App.css';
import { Switch, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" render={(props) => (<Home {...props} />)} />
        <Route path="/login" render={(props) => (<Login {...props} />)} />
      </Switch>
    </div>
  );
}

export default App;
