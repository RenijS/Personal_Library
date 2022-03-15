const firebaseConfig = {
  apiKey: "AIzaSyAn8jIjl1ta6kG6KFSoKACzMUJCb28CaM8",
  authDomain: "personal-library-d9a58.firebaseapp.com",
  projectId: "personal-library-d9a58",
  storageBucket: "personal-library-d9a58.appspot.com",
  messagingSenderId: "536458182452",
  appId: "1:536458182452:web:d295d1df3fe252f656ef61",
  measurementId: "G-498RMTQ3JP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
