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
  UserCredential,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Dispatch } from 'redux';

import { setModalMessage } from '../redux/user/userActions';
import { setGlobalLoadingAction } from '../redux/global/globalActions';

import 'firebase/firestore';

import { Item, Items } from '../interfaces/item';
import { List } from '../interfaces/list';
import { UserInfo } from '../interfaces/user';
import { ModalHeaderBackground } from '../interfaces/modal';

import { fetchListItemsAction, fetchUserListAction } from '../redux/list/listActions';
import { setGoogleCalendarAccessToken } from '../redux/user/userActions';
import { API_ENDPOINTS } from '../config/api';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN_FIREBASE,
  projectId: import.meta.env.VITE_PROJECT_ID_FIREBASE,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_FIREBASE,
  appId: import.meta.env.VITE_APP_ID_FIREBASE,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID_FIREBASE,
};

firebase.initializeApp(firebaseConfig);

export const analytics = getAnalytics();
export const auth = getAuth();
export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'consent',
  access_type: 'offline',
  include_granted_scopes: 'true',
});

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

export const getGoogleCalendarAccessToken = async (userCredential: UserCredential, dispatch: any) => {
  const credential = GoogleAuthProvider.credentialFromResult(userCredential);
  const accessToken = credential?.accessToken;

  const expiresIn = parseInt((userCredential as any)._tokenResponse?.expiresIn || '3600');
  const expiresAt = Date.now() + expiresIn * 1000;

  if (!accessToken) {
    throw new Error('Failed to retrieve google calendar access token');
  }

  try {
    // Get Firebase ID token for authentication
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch(API_ENDPOINTS.STORE_TOKENS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken,
        accessToken,
        expiresAt,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to store tokens');
    }

    dispatch(setGoogleCalendarAccessToken(true));
    console.log('OAuth tokens stored securely on backend');
  } catch (error: any) {
    console.error('Error storing OAuth tokens:', error);
    throw new Error('Failed to store Google Calendar tokens: ' + error.message);
  }

  return accessToken; // Return for any immediate use if needed
};

export const signInWithGoogle = async (dispatch: Dispatch): Promise<UserInfo | null> => {
  // Request Google Calendar permissions
  provider.addScope('https://www.googleapis.com/auth/calendar.events');

  try {
    dispatch(setGlobalLoadingAction(true));

    const userCredential = await signInWithPopup(auth, provider);
    const userAuth = userCredential.user;

    await getGoogleCalendarAccessToken(userCredential, dispatch);

    dispatch(setGlobalLoadingAction(false));

    return { userAuth, userCredential };
  } catch (error: any) {
    dispatch(setGlobalLoadingAction(false));

    const errorCode = error.code;
    dispatch(
      setModalMessage({
        title: 'Error',
        content: `There was an error signing in: ${errorCode}`,
        headerBackground: ModalHeaderBackground.error,
        closeText: 'Close',
      }),
    );
    console.log(`There was an error signing in: ${errorCode}`);
    return null;
  }
};

export const signInWithPassword = async (loginEmail: string, loginPass: string, dispatch: Dispatch) => {
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
        closeText: 'Close',
      }),
    );
    console.log(`There was an error signing in: ${errorCode}`);
    return null;
  }
};

export const registerNewUser = async (email: string, password: string, dispatch: Dispatch) => {
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
        closeText: 'Close',
      }),
    );
    console.log(`There was an error registering new user: ${errorCode}`);
    return null;
  }
};

export const signOutUser = async (dispatch: Dispatch) => {
  try {
    dispatch(setGoogleCalendarAccessToken(false));
    await signOut(auth);
    console.log('Sign Out Succesfull');
  } catch (error) {
    console.log(`Error Signing out ${error}`);
  }
};

export const fetchUserLists = (userId: string) => async (dispatch: Dispatch) => {
  const userListsRef = firestore.collection(`/users/${userId}/lists/`);
  try {
    userListsRef.onSnapshot((snapShot) => {
      let listsObject = {};
      const lists = snapShot.docs.map((item) => item.data());
      lists.forEach((list) => {
        if (list.items) {
          let listItems = {};
          const itemsKeys = Object.keys(list.items).sort();
          for (const key of itemsKeys) {
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

export const fetchListsItems = (userId: string, listId: string) => async (dispatch: Dispatch) => {
  const listItemsRef = firestore.collection(`/users/${userId}/lists/${listId}/items`);
  try {
    listItemsRef.onSnapshot((snapShot) => {
      const listsItemsObject: Items = {};
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

export const addListNameToFirestore = async (userId: string, listId: string, listDetails: List, dispatch: Dispatch) => {
  const docRef = firestore.collection(`/users/${userId}/lists`).doc(listId);
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
        content: 'You have a list with the same name',
        headerBackground: ModalHeaderBackground.error,
        closeText: 'Close',
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

export const addListItemToFirestore = async (userId: string, listId: string, item: Item, dispatch: Dispatch) => {
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
        closeText: 'Close',
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
