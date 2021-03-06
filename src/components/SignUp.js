import React, {useState, useContext} from "react";
import {Link, Redirect} from "react-router-dom";
import Recaptcha from "react-recaptcha";
import FormButton, {FormInput, FormHeader, OtherComponents} from "./FormButton";
import {AuthContext} from "./Auth";
import firebaseConfig from "../config.js";
import {FireBase} from "../config.js";
const manual = "https://raw.githubusercontent.com/uniqueredhat/File-Encryption/main/manual.pdf";

const Form = props => {
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
    <FormButton title="Sign Up" type="submit"/>
  </div>)
};

const SignUp = () => {
  const [captcha, setcaptcha] = useState(false);
  const [userExists, alreadyUserExists] = useState(null);
  const [captchaWrong, setCaptchaWrong] = useState(null);
  const [now, setNow] = useState(true);
  const [TermsAndCondition, setTermsAndCondition] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const {currentUser} = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (TermsAndCondition) {

      if (captcha) {
        const {email, password} = e.target.elements;
        firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value).then((userCredential) => {
          setNow(false);
          FireBase.collection("users").doc(userCredential.user.uid).set({Email: email.value, password: password.value}).then(() => {
            firebaseConfig.auth().signOut();
            userCredential.user.sendEmailVerification().then(() => {
              alert("Verification Email is send");
              setRedirect(true);
            }).catch(() => {

              alert("Try after some time")
            })
          }).catch((err) => {
            if (err.message === "The email address is badly formatted.") {
              alert(err.message);
              console.log(err.message);
            } else {
              alert(err.message);
              console.log(err.message);
            }
          })
        }).catch((err) => {
          if (err.message === "Password should be at least 6 characters") {
            alert(err.message);
            console.log(alert.message);
          } else if (err.message === "The email address is already in use by another account.") {
            console.log("User already exist");
            alert(err.message);
            alreadyUserExists(true);
          } else {
            alert(err.message);
          }
        })
      } else {
        setCaptchaWrong("Check Captcha");
        console.log("Check the Captcha");
      }
    } else {
      setCaptchaWrong("Agree Terms andCondition.");
      console.log("Check the Terms And Condition");
    }
  };
  const callBack = () => {}
  if (redirect) {
    return <Redirect to="/Login"/>;
  }
  const verifyBack = (response) => {
    if (response) {
      setcaptcha(true);
    }

  }

  if (currentUser) {
    if (now)
      return <Redirect to="/Dashboard"/>;
    }
  if (userExists) {
    return <Redirect to="/Login"/>;
  }

  return (<div>

    <form onSubmit={handleSubmit}>
      <div id="loginform">
        <FormHeader title="Register"/>
        <Form/>
        <center>
          <Recaptcha sitekey="6LeALqsbAAAAAC8NXLLR916tG2tbTA3ADZsyKwVl" render="explicit" onloadCallback={callBack} verifyCallback={verifyBack}/></center>
        <p className="centerTextRed">{captchaWrong}</p>
        <center>
          <input type="checkbox" onClick={(e) => {
              if (TermsAndCondition) {
                setTermsAndCondition(null);
              } else {
                setTermsAndCondition(true);
              }

            }}/>By signing you Agree to our
          <Link to="TandC">Terms and conditions</Link>
        </center>

        <OtherComponents name="Login" link="Login" value="Already have an account"/>
      </div>
    </form>
    <button className="btn btn-danger mt-0 mx-2" onClick={(e) => {
        window.open(manual)
      }}>Manual</button>
  </div>);
};

export default SignUp;
