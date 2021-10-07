import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD7_fv97wKBwGZI3S54LE09mVgzx873Jmw",
    authDomain: "ecobags-80cd8.firebaseapp.com",
    projectId: "ecobags-80cd8",
    storageBucket: "ecobags-80cd8.appspot.com",
    messagingSenderId: "825057662731",
    appId: "1:825057662731:web:ea215c96880d652222340e",
    measurementId: "G-LNCH85BFBC"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}