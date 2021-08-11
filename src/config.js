import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDiSPDbSnGzY4rgYIQ5-sHTHPy7yf6q9y8",
  authDomain: "loginpage-fb8c2.firebaseapp.com",
  databaseURL: "https://loginpage-fb8c2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "loginpage-fb8c2",
  storageBucket: "loginpage-fb8c2.appspot.com",
  messagingSenderId: "741813229778",
  appId: "1:741813229778:web:83c422fe6445918f2d750b"
});
var FireBase = firebaseConfig.firestore();

export {
  FireBase
};

export default firebaseConfig;
