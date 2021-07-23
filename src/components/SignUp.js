import React, {useState,useContext} from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../config";
import Recaptcha from "react-recaptcha";
import FormInput from "./FormInput";
import { AuthContext } from "./Auth";
import FormButton from "./FormButton";
import OtherComponents from "./OtherComponents";

const SignUp = () => {
  const [captcha, setcaptcha] = useState(true);
  const [currentUser] = useState(null); 
  const [userExists, alreadyUserExists] = useState(null);    
  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password } = e.target.elements;
    firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value) 
      .then((userCredential)=>{      
        userCredential.user.sendEmailVerification().then(()=>{
          firebaseConfig.auth().signOut();
          alert("Verification Email is send");
        }).catch(()=>{
         
          alert("Try after some time")
        })
      })
     .catch((err) => {
       if(err.message === "The email address is badly formatted."){
          alert(err.message);}
        else{
          alert(err.message);
      alreadyUserExists(true);
     }})
  };
  const callBack = () => {

  }

  const verifyBack = (response) => {
    if (response) {
      setcaptcha(false);
    }
    
  }
  const { currentUserLogin } = useContext(AuthContext);
  if (currentUser || currentUserLogin) {
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
      <FormButton title="Sign Up" type="submit" captcha={props.value}/>
    </div>
  );
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div id="loginform">
        <FormHeader title="Register" />
        <Form value={captcha}/>
        <Recaptcha
              sitekey="6LeALqsbAAAAAC8NXLLR916tG2tbTA3ADZsyKwVl"
              render="explicit"
              onloadCallback={callBack}
              verifyCallback={verifyBack}
            />
        <OtherComponents name="Login" link="Login" value="Already have an account"/>
      </div>
      </form>
    </div>
  );
};

export default SignUp;