import React, { useContext } from "react";
import { Redirect ,Link} from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/Login" />;
  }
  return (
    <div>
      <h1>File Encryption</h1>
      <p>This is the dashboard, if you can see this you're logged in.</p><br />
      <button onClick={() => firebaseConfig.auth().signOut()}>Sign out</button><br />
      <button><Link to="/Change">Change Password</Link></button>
      
    </div>
  );
};

export default Dashboard;