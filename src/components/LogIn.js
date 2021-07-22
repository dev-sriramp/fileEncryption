import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import Recaptcha from "react-recaptcha";
import './css/LogIn.css';
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import OtherComponents from "./OtherComponents";


const FormHeader = props => (
  <h2 id="headerTitle">{props.title}</h2>
);

const Form = props => (
  <div>
    {/* <FormInput description="Name" placeholder="Enter your Name" type="name" name="name" /> */}
    <FormInput description="Email" placeholder="Enter your email" type="email" name="email" />
    <FormInput description="Password" placeholder="Enter your password" type="password" name="password" />
    <FormButton title="Log in" type="submit" captcha={props.value} />
  </div>
);
const LogIn = () => {
  const [passwordWrong, setpasswordWrong] = useState(null);
  const [captcha, setcaptcha] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value)
      .catch(error => {
        setpasswordWrong("Check email or password");
      })

  };
  const callBack = () => {

  }

  const verifyBack = (response) => {
    if (response) {
      setcaptcha(false);
    }
    else {
      setpasswordWrong("Check Captcha");
    }
  }
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/Dashboard" />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div id="loginform">
          <FormHeader title="Login" />
          <Form value={captcha} />
            <Recaptcha
              sitekey="6LeALqsbAAAAAC8NXLLR916tG2tbTA3ADZsyKwVl"
              render="explicit"
              onloadCallback={callBack}
              verifyCallback={verifyBack}
            />
          <p className="centerText">
            <Link to="/Forget">Lost Your Password ?</Link>
          </p>
          <p className="centerTextRed">{passwordWrong}</p>
          <OtherComponents name="Sign Up" link="Signup" value="Dont have an account" />
        </div>
      </form>

    </div>
  );
};

export default LogIn;