import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../config";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import OtherComponents from "./OtherComponents";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null); 
  const [userExists, alreadyUserExists] = useState(null);    
  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password } = e.target.elements;
    firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value) 
      .then(()=>{setCurrentUser(true);})
     .catch(() => {
      alert("User Already Exists");
      alreadyUserExists(true);
    })
  };
  if (currentUser) {
      return <Redirect to="/dashboard" />;
  }
  if (userExists) {
    return <Redirect to="/login" />;
}
  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );
  const Form = props => (
    <div>
      <FormInput description="Email" placeholder="Enter your email" type="email" name="email" />
      <FormInput description="Password" placeholder="Enter your password" type="password" name="password"/>
      <FormButton title="Sign Up" type="submit"/>
    </div>
  );
  
  return (
    <>
      <form onSubmit={handleSubmit}>
      <div id="loginform">
        <FormHeader title="Register" />
        <Form />
        <OtherComponents name="Login" link="login" value="Already have an account"/>
      </div>
      </form>
    </>
  );
};

export default SignUp;