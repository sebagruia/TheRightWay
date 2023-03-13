import { getAnalytics } from 'firebase/analytics';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB6b4D40cLSubf_qDK7BzKMDnoH_l_2N1A',
  authDomain: 'therightway-e6f15.firebaseapp.com',
  projectId: 'therightway-e6f15',
  storageBucket: 'therightway-e6f15.appspot.com',
  messagingSenderId: '590591734476',
  appId: '1:590591734476:web:36a7e413a992f663df4869',
  measurementId: 'G-G7G582CTJS',
};

firebase.initializeApp(firebaseConfig);

export const analytics = getAnalytics();
// export const auth = firebase.auth();
export const auth = getAuth();
export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = Date.now();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const signInWithGoogle = async () => {
  try {
    // const userCredential = await auth.signInWithPopup(provider);
    const userCredential = await signInWithPopup(auth, provider);
    const userAuth = userCredential.user;
    return userAuth;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    console.log(`There was an error signing in ${errorCode}`);
    return null;
  }
};

export const signInWithPassword = async (loginEmail, loginPass) => {
  try {
    const userCredential = await signInWithEmailAndPassword(loginEmail, loginPass);
    const userAuth = userCredential.user;
    return userAuth;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    console.log(`There was an error signing in ${errorCode}`);
    return null;
  }
};

export const registerNewUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(email, password);
    const userAuth = userCredential.user;
    if (userAuth) {
      await userAuth.sendEmailVerification();
      return userAuth;
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    console.log(`There was an error registering new user ${errorCode}`);
    return null;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('Sign Out Succesfull');
  } catch (error) {
    console.log(`Error Signing out ${error}`);
  }
};

export const addListNameToFirestore = async (userId, listId, listDetails) => {
  try {
    firestore.collection(`/users/${userId}/lists/`).doc(listId).set(listDetails);
  } catch (error) {
    console.log(error);
  }
};

export const deleteListFromFirestore = async (userId, listId) => {
  // const listRef = firestore.doc(`/users/${userId}/lists/${listId}/items`);
  const itemsRef = firestore.collection(`/users/${userId}/lists/${listId}/items`);

  try {
    const items = await itemsRef.get();
    items.docs.map((doc) => doc.ref.delete());
    firestore.collection(`/users/${userId}/lists/`).doc(listId).delete();
  } catch (error) {
    console.log(error);
  }
};

export const addListItemToFirestore = async (userId, listId, item) => {
  const updatingObj = {};
  updatingObj[`items.${item.id}`] = item;
  try {
    firestore.doc(`/users/${userId}/lists/${listId}`).update(updatingObj);
    // firestore.collection(`/users/${userId}/lists/${listId}/items`).add(item);
  } catch (error) {
    console.log(error);
  }
};

export const deleteListItemFromFirestore = async (userId, listName, itemID) => {
  const updatingObj = {};
  updatingObj[`items.${itemID}`] = firebase.firestore.FieldValue.delete();
  try {
    firestore.doc(`/users/${userId}/lists/${listName}`).update(updatingObj);
  } catch (error) {
    console.log(error);
  }
};

export const toggleCheckInFirestore = async (userId, listId, item) => {
  const updatingObj = {};
  updatingObj[`items.${item.id}.check`] = !item.check;
  try {
    firestore.doc(`/users/${userId}/lists/${listId}`).update(updatingObj);
  } catch (error) {
    console.log(error);
  }
};

export const changeQuantityInFirestore = async (userId, listId, itemId, quantity) => {
  const updatingObj = {};
  updatingObj[`items.${itemId}.quantity`] = quantity;
  try {
    await firestore.doc(`/users/${userId}/lists/${listId}`).update(updatingObj);
  } catch (error) {
    console.log(error);
  }
};

export const updatingListItemNameToFirestore = async (userId, listId, itemId, itemName) => {
  const updatingObj = {};
  updatingObj[`items.${itemId}.itemName`] = itemName;
  try {
    firestore.doc(`/users/${userId}/lists/${listId}`).update(updatingObj);
  } catch (error) {
    console.log(error);
  }
};
