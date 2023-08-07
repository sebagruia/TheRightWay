import { getAnalytics } from 'firebase/analytics';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { setUserModalMessage } from '../redux/user/userActions';

import { Item } from '../interfaces/item';
import { List } from '../interfaces/list';
import { ModalHeaderBackground } from '../interfaces/modal';

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
export const auth = getAuth();
export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const createUserProfileDocument = async (userAuth: User, additionalData?: any) => {
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
    } catch (error: any) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const signInWithGoogle = async (dispatch: any) => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const userAuth = userCredential.user;
    return userAuth;
  } catch (error: any) {
    const errorCode = error.code;
    dispatch(
      setUserModalMessage({
        title: 'Error',
        content: `There was an error signing in: ${errorCode}`,
        headerBackground: ModalHeaderBackground.error,
      })
    );
    console.log(`There was an error signing in: ${errorCode}`);
    return null;
  }
};

export const signInWithPassword = async (loginEmail: string, loginPass: string, dispatch: any) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPass);
    const userAuth = userCredential.user;
    return userAuth;
  } catch (error: any) {
    const errorCode = error.code;
    dispatch(
      setUserModalMessage({
        title: 'Error',
        content: `There was an error signing in: ${errorCode}`,
        headerBackground: ModalHeaderBackground.error,
      })
    );
    console.log(`There was an error signing in: ${errorCode}`);
    return null;
  }
};

export const registerNewUser = async (email: string, password: string, dispatch: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userAuth = userCredential.user;
    if (userAuth) {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      }
      return userAuth;
    }
  } catch (error: any) {
    const errorCode = error.code;
    dispatch(
      setUserModalMessage({
        title: 'Error',
        content: `There was an error registering new user: ${errorCode}`,
        headerBackground: ModalHeaderBackground.error,
      })
    );
    console.log(`There was an error registering new user: ${errorCode}`);
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

export const addListNameToFirestore = async (userId: string, listId: string, listDetails: List) => {
  try {
    firestore.collection(`/users/${userId}/lists/`).doc(listId).set(listDetails);
  } catch (error) {
    console.log(error);
  }
};

export const deleteListFromFirestore = async (userId: string, listId: string) => {
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

export const addListItemToFirestore = async (userId: string, listId: string, item: Item) => {
  const updatingObj = {} as any;
  updatingObj[`items.${item.id}`] = item;
  try {
    firestore.doc(`/users/${userId}/lists/${listId}`).update(updatingObj);
    // firestore.collection(`/users/${userId}/lists/${listId}/items`).add(item);
  } catch (error) {
    console.log(error);
  }
};

export const deleteListItemFromFirestore = async (userId: string, listName: string, itemID: string) => {
  const updatingObj = {} as any;
  updatingObj[`items.${itemID}`] = firebase.firestore.FieldValue.delete();
  try {
    firestore.doc(`/users/${userId}/lists/${listName}`).update(updatingObj);
  } catch (error) {
    console.log(error);
  }
};

export const toggleCheckInFirestore = async (userId: string, listId: string, item: Item) => {
  const updatingObj = {} as any;
  updatingObj[`items.${item.id}.check`] = !item.check;
  try {
    firestore.doc(`/users/${userId}/lists/${listId}`).update(updatingObj);
  } catch (error) {
    console.log(error);
  }
};

export const changeQuantityInFirestore = async (userId: string, listId: string, itemId: string, quantity: string) => {
  const updatingObj = {} as any;
  updatingObj[`items.${itemId}.quantity`] = quantity;
  try {
    await firestore.doc(`/users/${userId}/lists/${listId}`).update(updatingObj);
  } catch (error) {
    console.log(error);
  }
};

export const updatingListItemToFirestore = async (
  userId: string,
  listId: string,
  itemId: string,
item:Item) => {
  const updatingObj = {} as any;
  updatingObj[`items.${itemId}`] = item;
  try {
    firestore.doc(`/users/${userId}/lists/${listId}`).update(updatingObj);
  } catch (error) {
    console.log(error);
  }
};
