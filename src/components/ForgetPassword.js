import React, { useContext } from "react";
import { Redirect} from "react-router-dom";
import FormInput from './FormInput';
import FormButton from "./FormButton";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";

const FormHeader = (props) => (
    <h2 id="headerTitle">{props.title}</h2>
  );

const Form = (props) =>(
<div>
    <FormInput description="Enter Email" placeholder="Enter Your Email" type="email" name="email"/>
    <FormButton title="Send Link" type="submit"/>
</div>
)

const ForgetPassword = () =>{
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email } = e.target.elements;
        firebaseConfig.auth().sendPasswordResetEmail(email.value)
        .then(()=>{
            alert("Reset password has send to your Mail");
        })
        .catch( error =>{
            alert("something went wrong");
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
        <FormHeader title="Reset Password" />
        <Form />
      </div>
          </form>
          </>
      );

}

export default ForgetPassword;