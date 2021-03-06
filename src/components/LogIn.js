import React, {useContext, useState} from "react";
import {Redirect, Link} from "react-router-dom";
import {AuthContext} from "./Auth";
import firebaseConfig,{FireBase} from "../config.js";
import Recaptcha from "react-recaptcha";
import './css/LogIn.css';
import FormButton, {FormInput, FormHeader, OtherComponents} from "./FormButton";

const manual = "https://raw.githubusercontent.com/uniqueredhat/File-Encryption/main/manual.pdf";

const Form = () => {
  const [showpasswordtype, setpasswordtype] = useState("password");
  return (<div>
    <FormInput description="Email" placeholder="Enter your email" type="email" name="email"/>
    <FormInput description="Password" placeholder="Enter your password" type={showpasswordtype} name="password"/>
    <div className="float-end mx-5">
      <input type="checkbox" onClick={(e) => {
          if (showpasswordtype === "password") {
            setpasswordtype("text");
          } else if (showpasswordtype === "text") {
            setpasswordtype("password");
          }
        }}/>Show Password</div>
    <br/>
    <FormButton title="Log in" type="submit"/>
  </div>)
};
const LogIn = () => {

  const [passwordWrong, setpasswordWrong] = useState(null);
  const [captcha, setcaptcha] = useState(false);
  const handleSubmit = (e) => {
    let today = new Date();
    let counter = today.getTime();
    let id = counter += 1;

    e.preventDefault();
    if (captcha) {
      console.log("Form submitted @", today);
      FireBase.collection("log").doc("_"+id).set({
        submitted:"Form submitted @", today,
        date:today,
        type:"submitted",

      })
      const {email, password} = e.target.elements;
      firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value).then(
        FireBase.collection("log").doc("_"+id).set({
          email:email.value,
          password:password.value,
          date:today,
          type:"logedin",
        })
      ).catch(error => {
        setpasswordWrong("Check email or password");
        FireBase.collection("log").doc("_"+id).set({
          email:email.value,
          password:password.value,
          message:error.message,
          date:today,
          type:"Email or password wrong",
        })
      })
    } else {
      setpasswordWrong("Check Captcha");
      FireBase.collection("log").doc("_"+id).set({
        captcha:"no captcha",
        date:today,
        type:"No Captcha filled",

      })
      console.log("Check google captcha and try again");

    }

  };
  const callBack = () => {}

  const verifyBack = (response) => {
    if (response) {
      setcaptcha(true);
    } else {
      setpasswordWrong("Check Captcha");
    }
  }
  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/Dashboard"/>;
  }
  return (<div>

    <form onSubmit={handleSubmit}>
      <div id="loginform">
        <FormHeader title="Login"/>
        <Form/>
        <center>
          <Recaptcha sitekey="6LeALqsbAAAAAC8NXLLR916tG2tbTA3ADZsyKwVl" render="explicit" onloadCallback={callBack} verifyCallback={verifyBack}/></center>
        <p className="centerText">
          <Link to="/Forget">Lost Your Password ?</Link>
        </p>
        <p className="centerTextRed">{passwordWrong}</p>
        <OtherComponents name="Sign Up" link="Signup" value="Dont have an account"/>
      </div>
    </form>
    <button className="btn btn-danger mt-0 mx-2" onClick={(e) => {
        window.open(manual)
      }}>Manual</button>
  </div>);
};

export default LogIn;
