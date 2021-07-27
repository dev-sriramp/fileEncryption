import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig,{FireBase} from "../config.js";
var CryptoJS = require("crypto-js");

const Dashboard = () => {
  const [filelocation, setfileLocation] = useState(null);
  const [filelocation1, setfileLocation1] = useState(null);
  const [filelocation3, setfileLocation3] = useState(null);
  const [filelocation4, setfileLocation4] = useState(null);
  // const [fileName,setfileName] = useState(null);
  const [inserted,setInserted] = useState(null);
  const [nooftime,setnooftime] = useState('1');
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/Login" />;
  }

  const dataPush = (e,e1,e2) =>{
  var today = new Date();
  var type = e;
  let fn = e1;
  console.log(fn);
  var counter = today.getTime();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '---' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var id = counter+=1;
console.log(date);
console.log(type);
// console.log(fileName);
console.log(nooftime);
if( inserted == null && nooftime === '1'){
setnooftime(nooftime+'1')
setInserted(true);
if(e2 === ""){
  e2 = "encrypted file";
}
FireBase.collection(currentUser.uid).doc('_'+id).set({
  id:'_'+id,
  time:date,
  type:type,
  filename:fn,
  filetype:e2,
})
}
  }
  const getBase64 = (e) => {
    setInserted(null);
    let file = e.target.files[0];
    if (file.size < 1024 * 1024 * 2) {
    var Password = prompt("Enter Your Password");
    try{
    var reader = new FileReader();
    reader.onload = function (e) {
      var encrypted = CryptoJS.AES.encrypt(e.target.result, Password);
      setfileLocation('data:application/octet-stream,' + encrypted);
      setfileLocation1(file.name + '.encrypted');
      dataPush("encrypt",file.name,file.type);
    };
    reader.readAsDataURL(file);
  }
  catch{
    alert("Enter Valid Password");
  }
    }
  else{
    alert('Please choose files smaller than 2mb.\n otherwise you may crash your browser.');
  }
  }
  const dec = e => {
    setInserted(null);
    let file = e.target.files[0];
    if (file.size < 1024 * 1024 * 2) {
    var Password = prompt("Enter Your Password");
    var reader = new FileReader();
    reader.onload = function (e) {
      var decrypted = CryptoJS.AES.decrypt(e.target.result, Password)
        .toString(CryptoJS.enc.Latin1);
      if (!/^data:/.test(decrypted)) {
        alert("Invalid pass phrase or file! Please try again.");
      }
      setfileLocation3(decrypted);
      setfileLocation4(file.name.replace('.encrypted', ''));
      dataPush("decrypt",file.name,file.type);
    }
    reader.readAsText(file);
  }
  else{
    alert('Please choose files smaller than 2mb.\n otherwise you may crash your browser.');
  }
  }
  return (
    <div>
      <h1>File Encryption</h1>
      <p>This is the dashboard, if you can see this you're logged in.</p><br />
      <button onClick={() => firebaseConfig.auth().signOut()}>Sign out</button><br />
      <button><Link to="/Change">Change Password</Link></button>
      <div>
        <input type="file" className="input-file" name="imgUpload" onClick ={(e)=>{setnooftime('1');setInserted(null)}} onChange={getBase64} />
        <a id="aEncsavefile" href={filelocation} download={filelocation1} >Save Encrypted File</a>
        <input type="file" className="input-file" name="imgUpload" onClick ={(e)=>{setnooftime('1');setInserted(null)}} onChange={dec} />
        <a id="aEncsavefile" href={filelocation3} download={filelocation4}>Save  File</a>
      </div><br />
      <h3><Link to="/List">Show List</Link></h3>
    </div>
  );
};

export default Dashboard;