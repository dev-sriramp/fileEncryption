import React,{Component} from "react";
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import ForgetPassword from "./components/ForgetPassword"
import { AuthProvider } from "./components/Auth";

class App extends Component {
  render(){
  return (
    <AuthProvider>
      <Router>
      <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/Home">
          <Home />
        </Route>
        <Route exact path="/Dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/Login">
          <LogIn />
        </Route>
        <Route exact path="/Signup">
          <SignUp />
        </Route>
        <Route exact path="/Forget">
          <ForgetPassword />
        </Route>
      </Router>
    </AuthProvider>
 );}
}

export default App;