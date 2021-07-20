import React,{Component} from "react";
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./components/Auth";

class App extends Component {
  render(){
  return (
    <Router>
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route> 
        <Route exact path="/login">
          <LogIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/Home">
          <Home />
        </Route>
  </Router>
  );}
}

export default App;

