import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBH8NKSDEA-TA1PpGNIDhceclp2e-aCsn4",
  authDomain: "bump-ad819.firebaseapp.com",
  projectId: "bump-ad819",
  storageBucket: "bump-ad819.appspot.com",
  messagingSenderId: "615249473766",
  appId: "1:615249473766:web:f4b73949990259898dcb27",
  measurementId: "G-NEC63D82DP"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const roomsCollection = db.collection('rooms')

export {
  db,
  auth,
  usersCollection,
  roomsCollection,
}
