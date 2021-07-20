import React, { useContext,useState } from "react";
import { Redirect,Link} from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import './css/LogIn.css';
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import OtherComponents from "./OtherComponents";

const FormHeader = props => (
  <h2 id="headerTitle">{props.title}</h2>
);
const Form = props => (
  <div>
    <FormInput description="Email" placeholder="Enter your email" type="email" name="email" />
    <FormInput description="Password" placeholder="Enter your password" type="password" name="password"/>
    <div className="g-recaptcha" data-sitekey="6LeALqsbAAAAAC8NXLLR916tG2tbTA3ADZsyKwVl"></div>
      <br/>
    <FormButton title="Log in" type="submit"/>
  </div>
);


const LogIn = () => {
  const [passwordWrong, setpasswordWrong] = useState(null); 
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value)
     .catch (error => {
      setpasswordWrong("Check email or password")
    })
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/Dashboard" />;
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      <div id="loginform">
        <FormHeader title="Login" />
        <Form />
        <span className="centerText">
        <Link className="centerText" to="/Forget">Lost Your Password ?</Link>
        </span>
        
        <p className="centerTextRed">{passwordWrong}</p>
        <OtherComponents name="Sign Up" link="Signup" value="Dont have an account"/>
      </div>
      </form>
      
    </>
  );
};

export default LogIn;