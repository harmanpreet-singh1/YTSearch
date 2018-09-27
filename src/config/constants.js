import * as firebase from 'firebase/app';
import 'firebase/auth';

// Firebase config properties.
export const config = {
    apiKey: "AIzaSyCVqiwXt0RsLK6C-E3Vgc4LWFLEKh66LIA", // API key of my account. You can change if you want.
    authDomain: "signin-1537700985967.firebaseapp.com",
    databaseURL: "https://signin-1537700985967.firebaseio.com",
    projectId: "youtube-signin-1537700985967",
    storageBucket: "youtube-signin-1537700985967.appspot.com",
    messagingSenderId: "350370106468"
  };

// Initialising the firebase app
firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
// Adding scope for accessing youtube profile of the user to update the rating of the video by using up and down arrows.
googleProvider.addScope(
  'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
);
export const firebaseAuth = firebase.auth;