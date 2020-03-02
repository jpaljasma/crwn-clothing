import firebase from 'firebase/app';
import 'firebase/firestore';  // for the db
import 'firebase/auth';  // for authentication

const config = {
  apiKey: "AIzaSyChD-B1cEkULepJyUK2Qv9SdXwYYHZyAEg",
  authDomain: "crwn-clothing-reactdb.firebaseapp.com",
  databaseURL: "https://crwn-clothing-reactdb.firebaseio.com",
  projectId: "crwn-clothing-reactdb",
  storageBucket: "crwn-clothing-reactdb.appspot.com",
  messagingSenderId: "507290513033",
  appId: "1:507290513033:web:6b1ad294c30328267de058",
  measurementId: "G-LHJ5Y9ES86"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// we want always to trigger the dialog
provider.setCustomParameters({
  prompt: 'select_account'
});

// we want sign in to only work with Google
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;