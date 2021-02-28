import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6b4D40cLSubf_qDK7BzKMDnoH_l_2N1A",
  authDomain: "therightway-e6f15.firebaseapp.com",
  projectId: "therightway-e6f15",
  storageBucket: "therightway-e6f15.appspot.com",
  messagingSenderId: "590591734476",
  appId: "1:590591734476:web:36a7e413a992f663df4869",
  measurementId: "G-G7G582CTJS"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`/user/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const signInWithPassword = (loginEmail, loginPass) => {
  auth.signInWithEmailAndPassword(loginEmail, loginPass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(`There was an error signing in ${errorCode}`);
    });
};

export const registerNewUser = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(`There was an error registering new user ${errorCode}`);
      return null;
    });
};
