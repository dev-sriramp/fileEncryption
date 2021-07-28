import React, { useContext, useState } from "react";
import { Redirect,Link } from "react-router-dom";
import FormInput from './FormInput';
import FormButton from "./FormButton";
import { AuthContext } from "./Auth";
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from "../config.js";

const FormHeader = (props) => (
  <h2 id="headerTitle">{props.title}</h2>
);

const Form = (props) => (
  <div>
    <FormInput description="Old Password" placeholder="Enter Old Password" type="password" name="OldPassword" />
    <FormInput description="New Password" placeholder="Enter New Password" type="password" name="NewPassword" />
    <FormButton title="Change Password" type="submit" />
  </div>
)
const ReAuthenticate = (props) => {
  var user = firebaseConfig.auth().currentUser;
  const email = user.email;
  var cred = firebase.auth.EmailAuthProvider.credential(
    email,
    props
  );
  return user.reauthenticateWithCredential(cred);
}
const ChangePassword = () => {
  const [pass, updatedpassword] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { OldPassword, NewPassword } = e.target.elements;
    ReAuthenticate(OldPassword.value).then(() => {
      var user = firebaseConfig.auth().currentUser;
      user.updatePassword(NewPassword.value)
        .then(() => {
          alert("Password Updated")
          updatedpassword(true);
        })
        .catch((err) => {
          alert(err.message);
        })
    }).catch(() => {
      alert("Something Went Wrong");
    })

  };
  const { currentUser } = useContext(AuthContext);
  if (pass) {
    return <Redirect to="/Dashboard" />;
  }
  if (!currentUser) {
    return <Redirect to="/Login" />;
  }
  return (
    <div>
       <Link to="/Dashboard" className="btn btn-primary btn-lg active mt-3 mx-3" role="button" aria-pressed="true">Back</Link>
      <form onSubmit={handleSubmit}>
        <div id="loginform">
          <FormHeader title="Change Password" />
          <Form />
        </div>
      </form>
    </div>
  );

}

export const auth = firebase.auth();
export default ChangePassword;