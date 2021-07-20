import React, { useContext } from "react";
import { Redirect,Link } from "react-router-dom";
import { AuthContext } from "./Auth";


const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
      <div className="row">
    <div className="col-md-8 offset-md-2">
      <h1>File Encryption</h1>
      {currentUser ? (
        <p>
          <Redirect to="/Dashboard" />
        </p>
      ) : (
        <p>
          <Link to="/Login">Log In</Link> or <Link to="/Signup">Sign Up</Link> 
        </p>
      )}
    </div>
    </div>
  );
};

export default Home;