import React, {useState,useContext} from "react";
import { Redirect } from "react-router-dom";
import Recaptcha from "react-recaptcha";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import OtherComponents from "./OtherComponents";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import {FireBase} from "../config.js";

const SignUp = () => {
  const [captcha, setcaptcha] = useState(true);
  const [userExists, alreadyUserExists] = useState(null);
  const [now, setNow] = useState(true);   
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;
    // FireBase.collection("ContactMe")
    // .add({
    //   Name: email.value,
    //   Email: password.value,
    // }).then(()=>{
    //   alert("user in")
      // firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value) 
    //   .then((userCredential)=>{
    //     FireBase.collection("ContactMe")
    //   .add({
    //     Name: email.value,
    //     Email: password.value,
    //   }).then(()=>{
    //     alert("user in")
    //   }).catch(()=>{
    //     alert("not")
    //   })
    //     firebaseConfig.auth().signOut();   
    //     userCredential.user.sendEmailVerification().then(()=>{
    //       // firebaseConfig.auth().signOut();
    //       alert("Verification Email is send");
    //     }).catch(()=>{
         
    //       alert("Try after some time")
    //     })
    //   })
    //  .catch((err) => {
    //    if(err.message === "The email address is badly formatted."){
    //       alert(err.message);}
    //     else{
    //       alert(err.message);
    //   alreadyUserExists(true);
    //  }})
    // }).catch(()=>{
    //   alert("not")
    // })
    firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value) 
      .then((userCredential)=>{
        setNow(false);
        FireBase.collection("users")
      .doc(userCredential.user.uid).set({
        Email: email.value,
        password: password.value,
      }).then(()=>{
        alert("user in");
        firebaseConfig.auth().signOut();   
        userCredential.user.sendEmailVerification().then(()=>{
          // firebaseConfig.auth().signOut();
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
      }).catch(()=>{
        alert("not")
      })
    //     firebaseConfig.auth().signOut();   
    //     userCredential.user.sendEmailVerification().then(()=>{
    //       // firebaseConfig.auth().signOut();
    //       alert("Verification Email is send");
    //     }).catch(()=>{
         
    //       alert("Try after some time")
    //     })
    //   })
    //  .catch((err) => {
    //    if(err.message === "The email address is badly formatted."){
    //       alert(err.message);}
    //     else{
    //       alert(err.message);
    //   alreadyUserExists(true);
    //  }})
  };
  const callBack = () => {

  }

  const verifyBack = (response) => {
    if (response) {
      setcaptcha(false);
    }
    
  }
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    if(now)
    return <Redirect to="/Dashboard" />;
  }
  if (userExists) {
    return <Redirect to="/Login" />;
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