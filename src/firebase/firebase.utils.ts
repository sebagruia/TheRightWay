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

import { setModalMessage } from '../redux/user/userActions';

import 'firebase/firestore';

import { Item, Items } from '../interfaces/item';
import { List } from '../interfaces/list';
import { ModalHeaderBackground } from '../interfaces/modal';

import { fetchListItemsAction, fetchUserListAction} from '../redux/list/listActions';

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
      setModalMessage({
        title: 'Error',
        content: `There was an error signing in: ${errorCode}`,
        headerBackground: ModalHeaderBackground.error,
      }),
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
      setModalMessage({
        title: 'Error',
        content: `There was an error signing in: ${errorCode}`,
        headerBackground: ModalHeaderBackground.error,
      }),
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
      setModalMessage({
        title: 'Error',
        content: `There was an error registering new user: ${errorCode}`,
        headerBackground: ModalHeaderBackground.error,
      }),
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

export const fetchUserLists = (userId: string) => async (dispatch: any) => {
  const userListsRef = firestore.collection(`/users/${userId}/lists/`);
  try {
    userListsRef.onSnapshot((snapShot) => {
      let listsObject = {};
      const lists = snapShot.docs.map((item) => item.data());
      lists.forEach((list) => {
        if (list.items) {
          let listItems = {};
          const itemsKeys = Object.keys(list.items).sort();
          for (let key of itemsKeys) {
            listItems = { ...listItems, [key]: list.items[key] };
          }
          listsObject = { ...listsObject, [list.id]: { ...list, items: { ...listItems } } };
        } else {
          listsObject = { ...listsObject, [list.id]: list };
        }
      });
      dispatch(fetchUserListAction(listsObject));
    });
  } catch (error) {
    console.log(`Error on Fetching Data From Firestore ${error}`);
  }
};

export const fetchListsItems = (userId: string, listId: string) => async (dispatch: any) => {
  const listItemsRef = firestore.collection(`/users/${userId}/lists/${listId}/items`);
  try {
    listItemsRef.onSnapshot((snapShot) => {
      let listsItemsObject: Items = {};
      const listItems = snapShot.docs.map((item) => item.data() as Item);
      listItems.forEach((item) => {
        listsItemsObject[item.id] = item;
      });
      dispatch(fetchListItemsAction(listsItemsObject));
    });
  } catch (error) {
    console.log(`Error on Fetching List Items From Firestore ${error}`);
  }
};

export const addListNameToFirestore = async (userId: string, listId: string, listDetails: List, dispatch: any) => {
  const docRef = firestore.collection(`/users/${userId}/lists/`).doc(listId);
  const snapShot = await docRef.get();
  if (!snapShot.exists) {
    try {
      docRef.set(listDetails);
    } catch (error) {
      console.log(error);
    }
  } else {
    dispatch(
      setModalMessage({
        title: 'Error',
        content: 'You have an item with the same name',
        headerBackground: ModalHeaderBackground.error,
      }),
    );
  }
};

export const deleteListFromFirestore = async (userId: string, listId: string) => {
  const itemsRef = firestore.collection(`/users/${userId}/lists/${listId}/items`);
  try {
    const items = await itemsRef.get();
    items.docs.map((doc) => doc.ref.delete());
    firestore.collection(`/users/${userId}/lists/`).doc(listId).delete();
  } catch (error) {
    console.log(error);
  }
};

export const addListItemToFirestore = async (userId: string, listId: string, item: Item, dispatch: any) => {
  const itemRef = firestore.doc(`/users/${userId}/lists/${listId}/items/${item.id}`);
  const itenSnapShot = await itemRef.get();
  if (!itenSnapShot.exists) {
    try {
      itemRef.set(item);
    } catch (error) {
      console.log(error);
    }
  } else {
    dispatch(
      setModalMessage({
        title: 'Error',
        content: 'You have an item with the same name',
        headerBackground: ModalHeaderBackground.error,
      }),
    );
  }
};

export const deleteListItemFromFirestore = async (userId: string, listId: string, itemID: string) => {
  try {
    firestore.doc(`/users/${userId}/lists/${listId}/items/${itemID}`).delete();
  } catch (error) {
    console.log(error);
  }
};

export const updatingListItemToFirestore = async (userId: string, listId: string, item: Item) => {
  try {
    firestore.collection(`/users/${userId}/lists/${listId}/items`).doc(item.id).set(item);
  } catch (error) {
    console.log(error);
  }
};
