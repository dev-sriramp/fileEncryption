import React, { useContext, useState } from "react";
import { Redirect ,Link} from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
var CryptoJS = require("crypto-js");



const Dashboard = () => {
  
   const [filelocation,setfileLocation] = useState(null);
   const [filelocation1,setfileLocation1] = useState(null);
   const [filelocation3,setfileLocation3] = useState(null);
   const [filelocation4,setfileLocation4] = useState(null);

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/Login" />;
  }
  const getBase64 = (e)  =>{
    let file = e.target.files[0];
    console.log(file);
     if(file.size > 1024*1024*2){
      alert('Please choose files smaller than 1mb, otherwise you may crash your browser. \nThis is a known issue. See the tutorial.');
     }
     var Password = prompt();
     console.log(file);
     console.log(Password);
     var reader = new FileReader();
     reader.onload = function(e){

      // Use the CryptoJS library and the AES cypher to encrypt the 
      // contents of the file, held in e.target.result, with the password

      var encrypted = CryptoJS.AES.encrypt(e.target.result, Password);
console.log(encrypted);
      // The download attribute will cause the contents of the href
      // attribute to be downloaded when clicked. The download attribute
      // also holds the name of the file that is offered for download.

      setfileLocation('data:application/octet-stream,' + encrypted);
      setfileLocation1(file.name+'.encrypted');

    
    };

    // This will encode the contents of the file into a data-uri.
    // It will trigger the onload handler above, with the result

    //   var pass = prompt("Enter Password");
    //   var reader = new FileReader();
    //   reader.onload = function(e){
    //     var encrypted = CryptoJS.AES.encrypt(e.target.result, pass);
    //     setfileLocation('data:application/octet-stream,' + encrypted);
    //     setfileLocation1(file.name+'enc');
    //   }
      reader.readAsDataURL(file);
  }

  const dec = e =>{
    let file = e.target.files[0];
    console.log(file);
    if(file.size > 1024*1024*2){
      alert('Please choose files smaller than 1mb, otherwise you may crash your browser. \nThis is a known issue. See the tutorial.');
     }
     var Password = prompt();
     console.log(file);
     console.log(Password);
    //  var decrypted = CryptoJS.AES.decrypt(e.target.result, Password).toString(CryptoJS.enc.Latin1);
    //  console.log(decrypted);
//     if(file.size < 1024*1024){
//       alert('Please choose files smaller than 1mb.');}
//       var pass = prompt("Enter Password");
       var reader = new FileReader();
       reader.onload = function(e){
        var decrypted = CryptoJS.AES.decrypt(e.target.result, Password)
        .toString(CryptoJS.enc.Latin1);
      
      if(!/^data:/.test(decrypted)){
        alert("Invalid pass phrase or file! Please try again.");
}

console.log(decrypted);
setfileLocation3(decrypted);
setfileLocation4(file.name.replace('.encrypted',''));

       }
//     }
 
//   }
  reader.readAsText(file);
}
  
  return (
    <div>
      <h1>File Encryption</h1>
      <p>This is the dashboard, if you can see this you're logged in.</p><br />
      <button onClick={() => firebaseConfig.auth().signOut()}>Sign out</button><br />
      <button><Link to="/Change">Change Password</Link></button>
      <div>
    <input type="file" className="input-file" name="imgUpload" onChange={getBase64} />
    <a id="aEncsavefile" href = {filelocation}  download = {filelocation1}>Save Encrypted File</a>
    <input type="file" className="input-file" name="imgUpload" onChange={dec} />
    <a id="aEncsavefile" href = {filelocation3}  download = {filelocation4}>Save  File</a>
  </div>
  <p></p>
    </div>
  );
};

export default Dashboard;