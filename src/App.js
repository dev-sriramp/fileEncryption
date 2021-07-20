import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./components/Auth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/login">
          <LogIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
      </Router>
    </AuthProvider>
  );
};

export default App;