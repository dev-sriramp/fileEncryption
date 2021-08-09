import React, { useContext, useState } from "react";
import { Redirect, } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig, { FireBase } from "../config.js";
import FormButton,{FormInput} from "./FormButton";
let CryptoJS = require("crypto-js");
const linkToLargeFile = "https://github.com/uniqueredhat/File-Encryption/releases";
const manual = "https://raw.githubusercontent.com/uniqueredhat/File-Encryption/main/manual.pdf";

const Dashboard = () => {
  const [hrefOfFile, setHrefOfFile] = useState(null);
  const [download, setDownload] = useState(null);
  const [type,setType] = useState("Encrypt");
  const { currentUser } = useContext(AuthContext);

  const [change,setchange] = useState(0);
  const [wrong,setWrong] = useState(null);
  const [high ,setHigh] = useState(false);

  if (!currentUser) {
    return <Redirect to="/Login" />;
  }
  if(change === 1){
    return <Redirect to="/Change" />;
  }
  else if(change === 2){
    return <Redirect to="/List" />;
  }
  console.log(currentUser);
  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
  );
  const dataPush = (mode, nameOfFile, typeOfFile) => {
    let today = new Date();
    let counter = today.getTime();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '---' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let id = counter += 1;
      if (typeOfFile === "") {
        typeOfFile = "encrypted file";
      }
      FireBase.collection(currentUser.uid).doc('_' + id).set({
        id: '_' + id,
        time: date,
        type: mode,
        filename: nameOfFile,
        filetype: typeOfFile,
      })
  }

  const Form = props => {
    const [showpasswordtype, setpasswordtype] = useState("password");
    return(
    <div>
      <center>
        <div className="upload-btn-wrapper">
          <button className="btn">Upload a file</button>
          <input type="file" name="file" />
        </div>
      </center>
      <FormInput description="Password" placeholder="Enter your password" type={showpasswordtype} name="password" />
      <div className="float-end mx-5">
        <input type="checkbox" onClick={(e) => {
          if (showpasswordtype === "password") {
            setpasswordtype("text");
          }
          else if (showpasswordtype === "text") {
            setpasswordtype("password");
          }
        }}
        />Show Password</div>
      <br />
      <FormButton title={type} type="submit" />

    </div>
    )};

  const handleSubmit = (e) => {
    if(type === "Encrypt"){
    e.preventDefault();
    try{
    let {file, password } = e.target.elements;
    file = file.files[0];
    if (file.size < 1024 * 1024 * 2 && password.value !== "") {
      try {
        let reader = new FileReader();
        reader.onload = function (e) {
          let encrypted = CryptoJS.AES.encrypt(e.target.result, password.value);
          setHrefOfFile('data:application/octet-stream,' + encrypted);
          setDownload(file.name + '.encrypted');
          dataPush(type, file.name, file.type);
        };
        reader.readAsDataURL(file);
      }
      catch {
        alert("Enter Valid Password");
      }
    }
    else {
      alert('Please choose files smaller than 2mb.\n otherwise you may crash your browser.');
      setHigh(true);
    }}
    catch{
      setWrong("check inputs");
    }
  }
  else if(type === "Decrypt"){
    e.preventDefault();
    try{
     let {file, password } = e.target.elements;
    file = file.files[0];
    if (file.size < 1024 * 1024 * 2 * 1.8 && password.value !== "") {
      try {
      let reader = new FileReader();
      reader.onload = function (e) {
        let decrypted = CryptoJS.AES.decrypt(e.target.result, password.value)
          .toString(CryptoJS.enc.Latin1);
        if (!/^data:/.test(decrypted)) {
          alert("Invalid pass phrase or file! Please try again.");
        }
        else{
        setHrefOfFile(decrypted);
        setDownload(file.name.replace('.encrypted', ''));
        dataPush(type, file.name, file.type);}
      }
      reader.readAsText(file);
    }
    catch {
      alert("Enter Valid Password");
    }
  }
    else {
      alert('Please choose files smaller than 2mb.\n otherwise you may crash your browser.');
setHigh(true);
    }}
    catch{
      setWrong("check inputs");
    }
  }
  };
 

  return (
    <div>
      <center><h1 className="text-white">File Encryption</h1></center>
      <button className="btn btn-danger float-end mt-0 mx-2" onClick={() => firebaseConfig.auth().signOut()}>Sign out</button><br /><br />
      <button className="btn btn-danger float-end mt-0 mx-2" onClick={(e) =>{setchange(1)}}>ChangePassword</button>
      <button className="btn btn-danger mt-0 mx-2" onClick={(e) =>{setchange(2)}}>Show List</button><br />
      <button className="btn btn-danger mt-0 mx-2" onClick={(e) =>{window.open(manual)}}>Manual</button>
      <div>
        <form onSubmit={handleSubmit}>
          <div id="loginform">
          <button type="button" className="btn btn-success Size" onClick={(e) =>{setType("Encrypt");setHrefOfFile(null);setDownload(null)}}>Encrypt</button>
          <button type="button" className="btn btn-danger float-end Size" onClick={(e) =>{setType("Decrypt");setHrefOfFile(null);setDownload(null)}}>Decrypt</button>
            <FormHeader title={type} />
            <Form />
            <center>
            <p className="text-danger">{wrong}</p>
            <a id="aEncsavefile" href={hrefOfFile} download={download}>Save {type}ed File</a>
            </center>
          </div>
        </form>
        <center>
        {high &&
<h3 className="text-white">
Download Our Desktop Application to process <a href={linkToLargeFile} target="_blank" rel="noreferrer">Large Files</a> 
</h3>
}</center>
      </div>
     
    </div>
  );
};

export default Dashboard;
