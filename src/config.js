import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBfB2-vEfrDwbKXIH6nG_7MJfAbfTBZ8CI",
    authDomain: "loginpage-2badc.firebaseapp.com",
    projectId: "loginpage-2badc",
    storageBucket: "loginpage-2badc.appspot.com",
    messagingSenderId: "1013978493377",
    appId: "1:1013978493377:web:9bed2db57d18e4198ebf40",
    measurementId: "G-73QNMVVMWD"
});

export default firebaseConfig;